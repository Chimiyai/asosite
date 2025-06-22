// Dosya Yolu: src/app/admin/team/new/page.tsx
import TeamMemberForm from '@/components/admin/TeamMemberForm';
import { createTeamMember } from '@/actions/teamActions';

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Yeni Ekip Üyesi Ekle</h1>
      <TeamMemberForm formAction={createTeamMember} />
    </div>
  );
}