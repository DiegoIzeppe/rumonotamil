// Auth agora usa cookie próprio (lib/auth.ts).
// Este hook retorna dados do usuário do mock para o frontend.
import { mockUser } from "@/lib/mock-data";

export function usePlatformUser() {
  return { user: mockUser, loading: false };
}
