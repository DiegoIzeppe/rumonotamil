-- ============================================================
-- RUMO À NOTA 1000 — Schema Supabase (PostgreSQL)
-- Cole este arquivo no SQL Editor do Supabase e execute.
-- ============================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- busca por similaridade de texto

-- ============================================================
-- 1. PROFILES (estende auth.users do Supabase)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT UNIQUE NOT NULL,
  name            TEXT,
  avatar_url      TEXT,
  role            TEXT NOT NULL DEFAULT 'STUDENT'
                    CHECK (role IN ('STUDENT', 'ADMIN', 'MODERATOR')),
  xp              INTEGER NOT NULL DEFAULT 0,
  level           INTEGER NOT NULL DEFAULT 1,
  streak_days     INTEGER NOT NULL DEFAULT 0,
  last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger: atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Trigger: cria profile automaticamente quando usuário se cadastra no Supabase Auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  -- Cria assinatura FREE por padrão
  INSERT INTO subscriptions (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 2. SUBSCRIPTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_customer_id     TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id        TEXT,
  plan                   TEXT NOT NULL DEFAULT 'FREE'
                           CHECK (plan IN ('FREE', 'BASICO', 'PRO', 'ELITE')),
  status                 TEXT NOT NULL DEFAULT 'ACTIVE'
                           CHECK (status IN ('ACTIVE', 'PAST_DUE', 'CANCELED', 'INCOMPLETE', 'TRIALING')),
  current_period_start   TIMESTAMPTZ,
  current_period_end     TIMESTAMPTZ,
  cancel_at_period_end   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 3. LESSONS
-- ============================================================
CREATE TABLE IF NOT EXISTS lessons (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  description       TEXT,
  content           TEXT,
  category          TEXT NOT NULL
                      CHECK (category IN ('C1','C2','C3','C4','C5','DICAS')),
  competency        INTEGER CHECK (competency BETWEEN 1 AND 5),
  difficulty        TEXT NOT NULL DEFAULT 'INTERMEDIATE'
                      CHECK (difficulty IN ('BEGINNER','INTERMEDIATE','ADVANCED')),
  reading_time      INTEGER NOT NULL DEFAULT 10,
  order_index       INTEGER NOT NULL DEFAULT 0,
  published         BOOLEAN NOT NULL DEFAULT FALSE,
  featured          BOOLEAN NOT NULL DEFAULT FALSE,
  thumbnail_url     TEXT,
  tags              TEXT[] NOT NULL DEFAULT '{}',
  practical_question TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS lessons_slug_idx       ON lessons(slug);
CREATE INDEX IF NOT EXISTS lessons_category_idx   ON lessons(category);
CREATE INDEX IF NOT EXISTS lessons_published_idx  ON lessons(published);

CREATE TRIGGER lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 4. LESSON PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS lesson_progress (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed    BOOLEAN NOT NULL DEFAULT FALSE,
  progress     REAL NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS lesson_progress_user_idx ON lesson_progress(user_id);

CREATE TRIGGER lesson_progress_updated_at
  BEFORE UPDATE ON lesson_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 5. QUESTION ANSWERS (questão prática no final de cada aula)
-- ============================================================
CREATE TABLE IF NOT EXISTS question_answers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id         UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  answer            TEXT NOT NULL,
  score             INTEGER CHECK (score BETWEEN 0 AND 10),
  feedback          TEXT,
  strengths         TEXT[] DEFAULT '{}',
  improvements      TEXT[] DEFAULT '{}',
  corrected_version TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS question_answers_user_idx ON question_answers(user_id);

-- ============================================================
-- 6. MODEL ESSAYS (redações nota 1000)
-- ============================================================
CREATE TABLE IF NOT EXISTS model_essays (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 TEXT NOT NULL,
  slug                  TEXT UNIQUE NOT NULL,
  theme                 TEXT NOT NULL,
  enem_year             INTEGER,
  score                 INTEGER NOT NULL CHECK (score BETWEEN 0 AND 1000),
  competency1           INTEGER NOT NULL CHECK (competency1 BETWEEN 0 AND 200),
  competency2           INTEGER NOT NULL CHECK (competency2 BETWEEN 0 AND 200),
  competency3           INTEGER NOT NULL CHECK (competency3 BETWEEN 0 AND 200),
  competency4           INTEGER NOT NULL CHECK (competency4 BETWEEN 0 AND 200),
  competency5           INTEGER NOT NULL CHECK (competency5 BETWEEN 0 AND 200),
  content               TEXT NOT NULL,
  overall_analysis      TEXT,
  competency_analysis   JSONB,   -- Array de {score, label, summary, detailedAnalysis, textEvidence, whatWorked, toImprove}
  paragraph_annotations JSONB,   -- Array de {index, label, labelColor, borderColor, bgColor, structure, technique, explanation}
  key_techniques        TEXT[] DEFAULT '{}',
  vocabulary_highlights TEXT[] DEFAULT '{}',
  strategic_lessons     TEXT[] DEFAULT '{}',
  repertoires           TEXT[] DEFAULT '{}',
  tags                  TEXT[] DEFAULT '{}',
  published             BOOLEAN NOT NULL DEFAULT FALSE,
  featured              BOOLEAN NOT NULL DEFAULT FALSE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS model_essays_slug_idx  ON model_essays(slug);
CREATE INDEX IF NOT EXISTS model_essays_score_idx ON model_essays(score DESC);
CREATE INDEX IF NOT EXISTS model_essays_year_idx  ON model_essays(enem_year);

CREATE TRIGGER model_essays_updated_at
  BEFORE UPDATE ON model_essays
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 7. ESSAY SUBMISSIONS (redações enviadas pelos alunos)
-- ============================================================
CREATE TABLE IF NOT EXISTS essay_submissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title       TEXT,
  content     TEXT NOT NULL,
  theme       TEXT,
  word_count  INTEGER NOT NULL DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'PENDING'
                CHECK (status IN ('PENDING','PROCESSING','COMPLETED','FAILED')),
  is_sim_mode BOOLEAN NOT NULL DEFAULT FALSE,
  time_taken  INTEGER, -- segundos
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS essay_submissions_user_idx   ON essay_submissions(user_id);
CREATE INDEX IF NOT EXISTS essay_submissions_status_idx ON essay_submissions(status);

CREATE TRIGGER essay_submissions_updated_at
  BEFORE UPDATE ON essay_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 8. AI FEEDBACK (resultado da correção IA)
-- ============================================================
CREATE TABLE IF NOT EXISTS ai_feedback (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id      UUID UNIQUE NOT NULL REFERENCES essay_submissions(id) ON DELETE CASCADE,
  score              INTEGER NOT NULL CHECK (score BETWEEN 0 AND 1000),
  competency1_score  INTEGER NOT NULL CHECK (competency1_score BETWEEN 0 AND 200),
  competency2_score  INTEGER NOT NULL CHECK (competency2_score BETWEEN 0 AND 200),
  competency3_score  INTEGER NOT NULL CHECK (competency3_score BETWEEN 0 AND 200),
  competency4_score  INTEGER NOT NULL CHECK (competency4_score BETWEEN 0 AND 200),
  competency5_score  INTEGER NOT NULL CHECK (competency5_score BETWEEN 0 AND 200),
  c1_feedback        TEXT NOT NULL,
  c2_feedback        TEXT NOT NULL,
  c3_feedback        TEXT NOT NULL,
  c4_feedback        TEXT NOT NULL,
  c5_feedback        TEXT NOT NULL,
  general_feedback   TEXT NOT NULL,
  strengths          TEXT[] DEFAULT '{}',
  weaknesses         TEXT[] DEFAULT '{}',
  suggestions        TEXT[] DEFAULT '{}',
  paragraph_notes    JSONB,
  rewrite_suggestion TEXT,
  prompt_version     TEXT NOT NULL DEFAULT 'v1',
  model_used         TEXT NOT NULL DEFAULT 'gpt-4o',
  tokens_used        INTEGER,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 9. SIMULADO SESSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS simulado_sessions (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  theme                TEXT NOT NULL,
  difficulty           TEXT DEFAULT 'INTERMEDIATE',
  duration_seconds     INTEGER NOT NULL,
  time_used_seconds    INTEGER,
  content              TEXT,
  word_count           INTEGER DEFAULT 0,
  paragraph_count      INTEGER DEFAULT 0,
  status               TEXT NOT NULL DEFAULT 'IN_PROGRESS'
                         CHECK (status IN ('IN_PROGRESS','COMPLETED','ABANDONED')),
  submission_id        UUID REFERENCES essay_submissions(id),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at         TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS simulado_user_idx ON simulado_sessions(user_id);

-- ============================================================
-- 10. STUDY PLANS
-- ============================================================
CREATE TABLE IF NOT EXISTS study_plans (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  start_date   DATE NOT NULL,
  end_date     DATE,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER study_plans_updated_at
  BEFORE UPDATE ON study_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 11. STUDY PLAN TASKS
-- ============================================================
CREATE TABLE IF NOT EXISTS study_plan_tasks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id      UUID NOT NULL REFERENCES study_plans(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  due_date     DATE,
  completed    BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  order_index  INTEGER NOT NULL DEFAULT 0,
  type         TEXT NOT NULL DEFAULT 'LESSON'
                 CHECK (type IN ('LESSON','ESSAY','REVIEW','PRACTICE')),
  reference_id UUID,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 12. ACHIEVEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS achievements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key         TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url    TEXT,
  xp_reward   INTEGER NOT NULL DEFAULT 0,
  rarity      TEXT NOT NULL DEFAULT 'COMMON'
                CHECK (rarity IN ('COMMON','UNCOMMON','RARE','EPIC','LEGENDARY')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 13. USER ACHIEVEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS user_achievements (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- ============================================================
-- 14. STREAKS
-- ============================================================
CREATE TABLE IF NOT EXISTS streaks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date       DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS streaks_user_idx ON streaks(user_id);

-- ============================================================
-- 15. NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  type       TEXT NOT NULL DEFAULT 'INFO'
               CHECK (type IN ('INFO','SUCCESS','WARNING','ERROR','ACHIEVEMENT','ESSAY_CORRECTED')),
  read       BOOLEAN NOT NULL DEFAULT FALSE,
  link       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS notifications_user_read_idx ON notifications(user_id, read);

-- ============================================================
-- 16. BOOKMARKS
-- ============================================================
CREATE TABLE IF NOT EXISTS bookmarks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id       UUID REFERENCES lessons(id) ON DELETE CASCADE,
  model_essay_id  UUID REFERENCES model_essays(id) ON DELETE CASCADE,
  repertoire_key  TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT bookmarks_has_target CHECK (
    lesson_id IS NOT NULL OR model_essay_id IS NOT NULL OR repertoire_key IS NOT NULL
  )
);

-- ============================================================
-- 17. NOTES
-- ============================================================
CREATE TABLE IF NOT EXISTS notes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id  UUID REFERENCES lessons(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  highlight  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER notes_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 18. RANKING ENTRIES
-- ============================================================
CREATE TABLE IF NOT EXISTS ranking_entries (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  period     TEXT NOT NULL, -- ex: "2024-W47", "2024-11", "all-time"
  xp         INTEGER NOT NULL DEFAULT 0,
  essays     INTEGER NOT NULL DEFAULT 0,
  avg_score  REAL NOT NULL DEFAULT 0,
  position   INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, period)
);

CREATE INDEX IF NOT EXISTS ranking_period_xp_idx ON ranking_entries(period, xp DESC);

CREATE TRIGGER ranking_updated_at
  BEFORE UPDATE ON ranking_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 19. WEEKLY THEMES
-- ============================================================
CREATE TABLE IF NOT EXISTS weekly_themes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  week        TEXT NOT NULL UNIQUE, -- ex: "2024-W47"
  active      BOOLEAN NOT NULL DEFAULT FALSE,
  tags        TEXT[] DEFAULT '{}',
  repertoires TEXT[] DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 20. DAILY THEMES
-- ============================================================
CREATE TABLE IF NOT EXISTS daily_themes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  date        DATE NOT NULL UNIQUE,
  difficulty  TEXT NOT NULL DEFAULT 'INTERMEDIATE'
                CHECK (difficulty IN ('BEGINNER','INTERMEDIATE','ADVANCED')),
  time_limit  INTEGER NOT NULL DEFAULT 60,
  tags        TEXT[] DEFAULT '{}',
  repertoires TEXT[] DEFAULT '{}',
  coletanea   JSONB,
  active      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 21. USER REPERTOIRES (repertórios salvos pelo aluno)
-- ============================================================
CREATE TABLE IF NOT EXISTS user_repertoires (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  repertoire_key  TEXT NOT NULL,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, repertoire_key)
);

-- ============================================================
-- 22. PROMPT TEMPLATES (para o sistema de IA)
-- ============================================================
CREATE TABLE IF NOT EXISTS prompt_templates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key         TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  content     TEXT NOT NULL,
  version     TEXT NOT NULL DEFAULT 'v1',
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER prompt_templates_updated_at
  BEFORE UPDATE ON prompt_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Habilitar RLS em todas as tabelas de usuário
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress   ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_answers  ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_feedback       ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulado_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_plans       ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_plan_tasks  ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks            ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications     ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks         ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes             ENABLE ROW LEVEL SECURITY;
ALTER TABLE ranking_entries   ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_repertoires  ENABLE ROW LEVEL SECURITY;

-- Conteúdo público (sem RLS ou política de leitura aberta)
ALTER TABLE lessons           ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_essays      ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements      ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_themes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_themes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_templates  ENABLE ROW LEVEL SECURITY;

-- ── Profiles ──────────────────────────────────────────────
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admin vê tudo
CREATE POLICY "profiles_admin_all" ON profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- ── Subscriptions ─────────────────────────────────────────
CREATE POLICY "subscriptions_own" ON subscriptions
  FOR ALL USING (auth.uid() = user_id);

-- ── Lessons (leitura pública para assinantes) ─────────────
CREATE POLICY "lessons_read_published" ON lessons
  FOR SELECT USING (published = TRUE);

CREATE POLICY "lessons_admin_all" ON lessons
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- ── Model Essays ─────────────────────────────────────────
CREATE POLICY "model_essays_read_published" ON model_essays
  FOR SELECT USING (published = TRUE);

CREATE POLICY "model_essays_admin_all" ON model_essays
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- ── Lesson Progress ───────────────────────────────────────
CREATE POLICY "lesson_progress_own" ON lesson_progress
  FOR ALL USING (auth.uid() = user_id);

-- ── Question Answers ──────────────────────────────────────
CREATE POLICY "question_answers_own" ON question_answers
  FOR ALL USING (auth.uid() = user_id);

-- ── Essay Submissions ─────────────────────────────────────
CREATE POLICY "essay_submissions_own" ON essay_submissions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "essay_submissions_admin" ON essay_submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- ── AI Feedback ───────────────────────────────────────────
CREATE POLICY "ai_feedback_own" ON ai_feedback
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM essay_submissions es
      WHERE es.id = ai_feedback.submission_id AND es.user_id = auth.uid()
    )
  );

-- ── Simulado Sessions ─────────────────────────────────────
CREATE POLICY "simulado_own" ON simulado_sessions
  FOR ALL USING (auth.uid() = user_id);

-- ── Study Plans ───────────────────────────────────────────
CREATE POLICY "study_plans_own" ON study_plans
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "study_plan_tasks_own" ON study_plan_tasks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM study_plans sp WHERE sp.id = plan_id AND sp.user_id = auth.uid())
  );

-- ── Achievements (leitura pública) ───────────────────────
CREATE POLICY "achievements_read_all" ON achievements
  FOR SELECT USING (TRUE);

CREATE POLICY "achievements_admin_write" ON achievements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- ── User Achievements ─────────────────────────────────────
CREATE POLICY "user_achievements_own" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_achievements_admin" ON user_achievements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- ── Streaks ───────────────────────────────────────────────
CREATE POLICY "streaks_own" ON streaks
  FOR ALL USING (auth.uid() = user_id);

-- ── Notifications ─────────────────────────────────────────
CREATE POLICY "notifications_own" ON notifications
  FOR ALL USING (auth.uid() = user_id);

-- ── Bookmarks ─────────────────────────────────────────────
CREATE POLICY "bookmarks_own" ON bookmarks
  FOR ALL USING (auth.uid() = user_id);

-- ── Notes ─────────────────────────────────────────────────
CREATE POLICY "notes_own" ON notes
  FOR ALL USING (auth.uid() = user_id);

-- ── Ranking (leitura pública, escrita própria) ────────────
CREATE POLICY "ranking_read_all" ON ranking_entries
  FOR SELECT USING (TRUE);

CREATE POLICY "ranking_own_write" ON ranking_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ── Weekly / Daily Themes (leitura pública) ──────────────
CREATE POLICY "weekly_themes_read" ON weekly_themes
  FOR SELECT USING (TRUE);

CREATE POLICY "daily_themes_read" ON daily_themes
  FOR SELECT USING (TRUE);

-- ── Prompt Templates (admin only) ────────────────────────
CREATE POLICY "prompt_templates_admin" ON prompt_templates
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- ── User Repertoires ─────────────────────────────────────
CREATE POLICY "user_repertoires_own" ON user_repertoires
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- FUNCTIONS ÚTEIS
-- ============================================================

-- Incrementar XP do usuário e recalcular nível
CREATE OR REPLACE FUNCTION add_xp(p_user_id UUID, p_xp INTEGER)
RETURNS void AS $$
DECLARE
  new_xp INTEGER;
  new_level INTEGER;
BEGIN
  UPDATE profiles SET xp = xp + p_xp WHERE id = p_user_id
  RETURNING xp INTO new_xp;

  -- Nível = floor(sqrt(xp / 100)) + 1
  new_level := FLOOR(SQRT(new_xp::float / 100)) + 1;
  UPDATE profiles SET level = new_level WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Registrar dia de streak
CREATE OR REPLACE FUNCTION register_streak(p_user_id UUID)
RETURNS void AS $$
DECLARE
  today DATE := CURRENT_DATE;
  yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
  had_yesterday BOOLEAN;
BEGIN
  -- Registrar hoje se não existe
  INSERT INTO streaks (user_id, date) VALUES (p_user_id, today)
  ON CONFLICT (user_id, date) DO NOTHING;

  -- Verificar se teve atividade ontem
  SELECT EXISTS(SELECT 1 FROM streaks WHERE user_id = p_user_id AND date = yesterday)
  INTO had_yesterday;

  IF had_yesterday THEN
    -- Incrementar streak
    UPDATE profiles SET streak_days = streak_days + 1, last_activity_at = NOW()
    WHERE id = p_user_id;
  ELSE
    -- Verificar se hoje já foi contado (primeiro dia ou reset)
    UPDATE profiles SET streak_days = 1, last_activity_at = NOW()
    WHERE id = p_user_id
      AND (last_activity_at::date < today OR last_activity_at IS NULL);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- View de ranking semanal
CREATE OR REPLACE VIEW ranking_weekly AS
SELECT
  p.id,
  p.name,
  p.avatar_url,
  s.plan,
  COALESCE(re.xp, p.xp) AS weekly_xp,
  COALESCE(re.essays, 0) AS essays,
  COALESCE(re.avg_score, 0) AS avg_score,
  ROW_NUMBER() OVER (ORDER BY COALESCE(re.xp, 0) DESC) AS position
FROM profiles p
LEFT JOIN subscriptions s ON s.user_id = p.id
LEFT JOIN ranking_entries re ON re.user_id = p.id
  AND re.period = TO_CHAR(NOW(), 'IYYY-"W"IW')
WHERE p.role = 'STUDENT'
ORDER BY weekly_xp DESC;

-- ============================================================
-- SEED DATA — ACHIEVEMENTS
-- ============================================================
INSERT INTO achievements (key, title, description, xp_reward, rarity) VALUES
  ('first_essay',    'Primeira Redação',      'Enviou sua primeira redação para correção',        50,   'COMMON'),
  ('first_lesson',   'Primeira Aula',         'Concluiu sua primeira aula na plataforma',         25,   'COMMON'),
  ('streak_3',       '3 Dias Seguidos',       'Manteve 3 dias consecutivos de estudo',            30,   'COMMON'),
  ('streak_7',       'Semana Dedicada',        'Manteve 7 dias de streak',                        100,  'UNCOMMON'),
  ('streak_15',      'Quinzena Perfeita',     'Manteve 15 dias de streak',                       200,  'RARE'),
  ('streak_30',      'Mês Perfeito',          'Manteve 30 dias de streak',                       500,  'EPIC'),
  ('streak_60',      'Dois Meses Seguidos',   'Manteve 60 dias de streak',                       800,  'EPIC'),
  ('essays_5',       'Escritor Iniciante',    'Enviou 5 redações para correção',                  75,  'COMMON'),
  ('essays_10',      'Escritor Assíduo',      'Enviou 10 redações para correção',                150,  'UNCOMMON'),
  ('essays_25',      'Escritor Dedicado',     'Enviou 25 redações para correção',                300,  'RARE'),
  ('essays_50',      'Mestre das Palavras',   'Enviou 50 redações para correção',                500,  'EPIC'),
  ('score_600',      'Nível 600',             'Atingiu 600 pontos em uma redação',                50,  'COMMON'),
  ('score_700',      'Nível 700',             'Atingiu 700 pontos em uma redação',                75,  'COMMON'),
  ('score_800',      'Alto Nível',            'Atingiu 800 pontos em uma redação',               200,  'RARE'),
  ('score_880',      'Quase Elite',           'Atingiu 880 pontos em uma redação',               350,  'RARE'),
  ('score_920',      'Excelência',            'Atingiu 920 pontos em uma redação',               500,  'EPIC'),
  ('score_960',      'Quase Lá',              'Atingiu 960 pontos em uma redação',               700,  'EPIC'),
  ('score_1000',     'Nota Máxima',           'Atingiu 1000 pontos na redação',                 1000,  'LEGENDARY'),
  ('c5_perfect',     'Intervenção Perfeita',  'Atingiu 200 em C5',                               200,  'RARE'),
  ('c4_perfect',     'Coesão Total',          'Atingiu 200 em C4',                               200,  'RARE'),
  ('all_c1_lessons', 'Mestre da Norma',       'Concluiu todas as aulas de C1',                   150,  'UNCOMMON'),
  ('all_c2_lessons', 'Mestre do Repertório',  'Concluiu todas as aulas de C2',                   150,  'UNCOMMON'),
  ('all_c3_lessons', 'Mestre dos Argumentos', 'Concluiu todas as aulas de C3',                   150,  'UNCOMMON'),
  ('all_c4_lessons', 'Mestre da Coesão',      'Concluiu todas as aulas de C4',                   150,  'UNCOMMON'),
  ('all_c5_lessons', 'Mestre da Intervenção', 'Concluiu todas as aulas de C5',                   150,  'UNCOMMON'),
  ('all_lessons',    'Aluno Completo',        'Concluiu todas as aulas da plataforma',            800,  'EPIC'),
  ('first_simulado', 'Primeira Prova',        'Completou seu primeiro simulado ENEM',              50,  'COMMON'),
  ('simulado_3',     'Simulador',             'Completou 3 simulados',                           150,  'UNCOMMON'),
  ('level_5',        'Nível 5',               'Atingiu o Nível 5 na plataforma',                 100,  'COMMON'),
  ('level_10',       'Nível 10',              'Atingiu o Nível 10 na plataforma',                300,  'RARE'),
  ('level_20',       'Nível 20',              'Atingiu o Nível 20 na plataforma',                800,  'EPIC')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- SEED DATA — LESSONS (18 aulas + 3 dicas práticas)
-- ============================================================
INSERT INTO lessons (title, slug, description, category, competency, difficulty, reading_time, order_index, published, practical_question) VALUES
  -- C1
  ('C1 Iniciante — Fundamentos da Norma Culta',
   'c1-iniciante',
   'Entenda o que é a Competência 1 e quais erros eliminam pontos imediatamente.',
   'C1', 1, 'BEGINNER', 10, 1, TRUE,
   'Reescreva a frase corrigindo os erros gramaticais: ''Os jovens brasileiros é cada vez mais expostos às redes sociais, o que comprometem seu desenvolvimento crítico.'''),

  ('C1 Intermediário — Ortografia, Concordância e Regência',
   'c1-intermediario',
   'Aprofunde-se nos desvios mais cobrados pelo ENEM e como evitá-los.',
   'C1', 1, 'INTERMEDIATE', 15, 2, TRUE,
   'Identifique e corrija todos os desvios da norma culta no trecho: ''Mediante a isso, o governo deveria de implementar políticas que visem combater a desinformação, visto que a mesma prejudica a democracia.'''),

  ('C1 Avançado — Pontuação e Registros Formais',
   'c1-avancado',
   'Domine vírgulas, ponto-e-vírgulas e o registro formal para garantir os 200 pontos.',
   'C1', 1, 'ADVANCED', 20, 3, TRUE,
   'Pontue corretamente o parágrafo a seguir, justificando cada escolha: ''Os dados do IBGE divulgados em 2022 revelam que a desigualdade social no Brasil permanece alta apesar das políticas públicas implementadas ao longo das últimas décadas o que exige uma revisão profunda das estratégias adotadas.'''),

  -- C2
  ('C2 Iniciante — Lendo e Entendendo a Proposta',
   'c2-iniciante',
   'Aprenda a extrair o tema, o recorte e as perspectivas esperadas na redação.',
   'C2', 2, 'BEGINNER', 10, 4, TRUE,
   'Leia o tema: ''Desafios para a valorização dos povos indígenas no Brasil''. Escreva um parágrafo de introdução que demonstre compreensão plena da proposta sem fugir do tema.'),

  ('C2 Intermediário — Repertório Sociocultural de Alto Impacto',
   'c2-intermediario',
   'Como selecionar, adaptar e usar repertórios que elevam sua nota para 200.',
   'C2', 2, 'INTERMEDIATE', 18, 5, TRUE,
   'Para o tema ''Impactos da desinformação na democracia brasileira'', apresente três repertórios socioculturais (filósofo, dado estatístico e obra cultural) e explique como cada um se relaciona com o tema.'),

  ('C2 Avançado — Repertório Autoral e Conexões Temáticas',
   'c2-avancado',
   'Crie conexões sofisticadas entre diferentes áreas do conhecimento para atingir 200 em C2.',
   'C2', 2, 'ADVANCED', 22, 6, TRUE,
   'Escreva um parágrafo de desenvolvimento que conecte pelo menos dois repertórios de áreas distintas (ex: filosofia + ciência) ao tema ''Crise climática e responsabilidade individual''.'),

  -- C3
  ('C3 Iniciante — O que é Argumentação no ENEM',
   'c3-iniciante',
   'Compreenda a diferença entre opinião e argumento, e por que isso define sua nota em C3.',
   'C3', 3, 'BEGINNER', 12, 7, TRUE,
   'Escreva um argumento (não uma opinião) para defender a seguinte tese: ''O uso excessivo de redes sociais é prejudicial à saúde mental dos jovens''. Use dados ou exemplos concretos.'),

  ('C3 Intermediário — Estruturas de Argumento',
   'c3-intermediario',
   'Domine as estruturas: dado → análise → conclusão, concessão, e argumento por exemplificação.',
   'C3', 3, 'INTERMEDIATE', 18, 8, TRUE,
   'Desenvolva um parágrafo argumentativo completo usando a estrutura: contexto → argumento central → evidência concreta → análise crítica → conexão com a tese. Tema livre.'),

  ('C3 Avançado — Argumentação Sem Senso Comum',
   'c3-avancado',
   'Técnicas para construir argumentos originais, densos e com profundidade analítica.',
   'C3', 3, 'ADVANCED', 25, 9, TRUE,
   'Reescreva o argumento abaixo, transformando-o de senso comum em argumento analítico sofisticado: ''A violência aumentou porque as pessoas perderam os valores morais e a família está desestruturada.'''),

  -- C4
  ('C4 Iniciante — Coesão: o que é e por que importa',
   'c4-iniciante',
   'Entenda como conectivos e pronomes criam o fio condutor do seu texto.',
   'C4', 4, 'BEGINNER', 10, 10, TRUE,
   'Conecte os dois parágrafos abaixo usando conectivos adequados, evitando repetir ''além disso'': P1: ''A tecnologia transformou a comunicação humana.'' P2: ''Muitas pessoas se sentem mais solitárias do que antes.'''),

  ('C4 Intermediário — Conectivos e Operadores Argumentativos',
   'c4-intermediario',
   'Catálogo completo de conectivos por função: adição, oposição, causa, consequência, conclusão.',
   'C4', 4, 'INTERMEDIATE', 16, 11, TRUE,
   'Reescreva o trecho substituindo TODOS os ''além disso'' por conectivos variados e adequados ao contexto: ''O desmatamento destrói habitats. Além disso, causa mudanças climáticas. Além disso, afeta comunidades indígenas. Além disso, prejudica a economia local.'''),

  ('C4 Avançado — Progressão Temática e Coerência Global',
   'c4-avancado',
   'Garanta que cada parágrafo avança o raciocínio e o texto tem unidade perfeita.',
   'C4', 4, 'ADVANCED', 20, 12, TRUE,
   'Analise a coesão do texto abaixo e reescreva-o garantindo progressão temática clara entre os parágrafos: ''A educação é fundamental. Os professores ganham pouco. O Brasil tem problemas econômicos. A desigualdade é grande. As crianças precisam de atenção.'''),

  -- C5
  ('C5 Iniciante — O que o ENEM espera na Intervenção',
   'c5-iniciante',
   'Entenda os 5 elementos obrigatórios da proposta de intervenção e por que cada um importa.',
   'C5', 5, 'BEGINNER', 12, 13, TRUE,
   'Escreva uma proposta de intervenção para o tema ''Combate à desinformação nas redes sociais''. Identifique explicitamente: agente, ação, modo/meio, finalidade e detalhamento.'),

  ('C5 Intermediário — Proposta Detalhada e Direitos Humanos',
   'c5-intermediario',
   'Como detalhar a proposta sem violar direitos humanos e garantir os 200 pontos.',
   'C5', 5, 'INTERMEDIATE', 18, 14, TRUE,
   'Compare as duas propostas abaixo e explique qual seria mais bem avaliada pelo ENEM e por quê: A) ''O governo deve combater a violência.'' B) ''O Ministério da Justiça deve implementar programas de mediação de conflitos em periferias, em parceria com ONGs, por meio de centros comunitários, com o objetivo de reduzir índices de violência sem criminalizar a pobreza.'''),

  ('C5 Avançado — Intervenção Criativa e Articulada ao Texto',
   'c5-avancado',
   'Crie propostas originais que dialogam com os argumentos do texto e garantem nota máxima.',
   'C5', 5, 'ADVANCED', 22, 15, TRUE,
   'Para o tema ''Invisibilidade do trabalho doméstico feminino no Brasil'', elabore uma proposta de intervenção completa (mínimo 5 linhas) que: seja viável, respeite direitos humanos, articule-se aos argumentos desenvolvidos no texto e apresente todos os elementos exigidos.'),

  -- DICAS
  ('Como escrever uma introdução nota 10',
   'dicas-introducao-perfeita',
   '3 modelos de abertura que impressionam os avaliadores: dado, citação e situação-problema.',
   'DICAS', NULL, 'INTERMEDIATE', 8, 16, TRUE,
   'Escreva 3 versões de introdução para o tema ''Saúde mental dos jovens brasileiros'': uma usando dado estatístico, outra usando citação de autor, e outra usando situação-problema. Qual você acha mais eficaz?'),

  ('Conclusão e C5: como fechar com chave de ouro',
   'dicas-conclusao-c5',
   'O último parágrafo precisa retomar a tese E apresentar proposta completa. Veja como.',
   'DICAS', NULL, 'INTERMEDIATE', 8, 17, TRUE,
   'Escreva um parágrafo de conclusão completo para uma redação sobre ''Desafios da inclusão digital no Brasil'', retomando a tese e apresentando proposta de intervenção detalhada.'),

  ('50 repertórios que os avaliadores adoram',
   'dicas-repertorios-impactantes',
   'Lista curada de filósofos, dados, obras e eventos históricos organizados por tema.',
   'DICAS', NULL, 'BEGINNER', 12, 18, TRUE,
   'Escolha 3 repertórios desta lista e escreva um parágrafo de desenvolvimento para o tema ''Crise democrática no século XXI'', usando os três de forma integrada e natural.')

ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED DATA — WEEKLY THEME
-- ============================================================
INSERT INTO weekly_themes (title, description, week, active, tags, repertoires) VALUES
  (
    'Crise da Saúde Mental na Era Digital',
    'Discuta os desafios e consequências da saúde mental para jovens brasileiros no contexto do uso excessivo de redes sociais e tecnologias digitais, e proponha intervenções efetivas.',
    '2024-W47',
    TRUE,
    ARRAY['saúde mental', 'tecnologia', 'juventude', 'redes sociais'],
    ARRAY['OMS: 1 em cada 4 jovens sofre de transtorno mental', 'Byung-Chul Han — Sociedade do Cansaço', 'Jonathan Haidt — A Geração Ansiosa', 'IBGE: 70% dos jovens usam redes sociais mais de 4h/dia']
  )
ON CONFLICT (week) DO NOTHING;

-- ============================================================
-- SEED DATA — PROMPT TEMPLATES
-- ============================================================
INSERT INTO prompt_templates (key, name, description, content, version, active) VALUES
  (
    'essay_correction_v2',
    'Correção de Redação ENEM v2',
    'Prompt principal para correção das 5 competências do ENEM',
    'Você é um avaliador especialista em redações do ENEM com mais de 20 anos de experiência. Avalie a redação fornecida nas 5 competências (C1-C5, cada uma de 0 a 200) e retorne um JSON completo com score, feedback por competência, pontos fortes, fraquezas, sugestões e notas por parágrafo.',
    'v2',
    TRUE
  ),
  (
    'study_plan_generator',
    'Gerador de Plano de Estudos',
    'Gera plano de estudos personalizado baseado no desempenho do aluno',
    'Você é um tutor educacional especializado em ENEM. Com base no histórico de desempenho do aluno, gere um plano de estudos detalhado com tarefas diárias e semanais priorizando as competências mais fracas.',
    'v1',
    TRUE
  ),
  (
    'question_correction_v1',
    'Correção de Questão Prática',
    'Corrige respostas às questões práticas ao final de cada aula',
    'Você é um professor especialista em redação ENEM. Avalie a resposta do aluno à questão prática, dando uma nota de 0 a 10, feedback construtivo, pontos positivos, sugestões de melhoria e, quando relevante, uma versão ideal da resposta.',
    'v1',
    TRUE
  ),
  (
    'assistant_v1',
    'Assistente de Redação',
    'Assistente conversacional para dúvidas sobre redação ENEM',
    'Você é um assistente especialista em redação do ENEM. Responda dúvidas sobre competências, repertório, estrutura e técnicas de forma clara, direta e prática. Máximo 3-4 parágrafos por resposta.',
    'v1',
    TRUE
  )
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- FIM DO SCHEMA
-- ============================================================
-- Para criar o primeiro usuário ADMIN manualmente:
-- 1. Crie o usuário no Supabase Auth Dashboard
-- 2. Execute: UPDATE profiles SET role = 'ADMIN' WHERE email = 'admin@seudominio.com';
-- ============================================================
