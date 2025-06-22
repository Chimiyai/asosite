import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { updateTeamMember } from '@/actions/teamActions';
import TeamMemberForm from '@/components/admin/TeamMemberForm';

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const member = await prisma.teamMember.findUnique({
    where: { id: params.id },
  });

  if (!member) {
    notFound();
  }

  const updateTeamMemberWithId = updateTeamMember.bind(null, member.id);

  // Prisma'dan gelen socials alanı JSON olabilir, bunu düz bir nesneye çevirelim
  const socials = typeof member.socials === 'object' && member.socials !== null 
    ? (member.socials as { [key: string]: string }) 
    : {};

  const initialData = {
    name: member.name,
    role: member.role,
    imageUrl: member.imageUrl,
    socials: socials,
    order: member.order,
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Ekip Üyesini Düzenle</h1>
      <TeamMemberForm
        formAction={updateTeamMemberWithId}
        initialData={initialData}
      />
    </div>
  );
}