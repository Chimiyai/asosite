// Dosya Yolu: src/app/admin/team/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import DeleteTeamMemberButton from '@/components/admin/DeleteTeamMemberButton';

export default async function AdminTeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ekip Üyelerini Yönet</h1>
        <Link
          href="/admin/team/new"
          className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700"
        >
          Yeni Üye Ekle
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg bg-gray-800">
        <table className="min-w-full text-left text-sm text-white">
          <thead className="bg-gray-700 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Resim</th>
              <th scope="col" className="px-6 py-3">İsim</th>
              <th scope="col" className="px-6 py-3">Rol</th>
              <th scope="col" className="px-6 py-3 text-right">Eylemler</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id} className="border-b border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{member.name}</td>
                <td className="px-6 py-4">{member.role}</td>
                <td className="px-6 py-4 text-right">
  <Link href={`/admin/team/${member.id}/edit`} className="font-medium text-blue-500 hover:underline">
    Düzenle
  </Link>
  <DeleteTeamMemberButton memberId={member.id} />
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}