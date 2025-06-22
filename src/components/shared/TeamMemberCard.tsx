// src/components/shared/TeamMemberCard.tsx

import Image from 'next/image';
// Prisma'nın otomatik oluşturduğu tipleri kullanmak için
import type { TeamMember } from '@prisma/client';

type TeamMemberCardProps = {
  member: TeamMember;
};

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-center">
      <Image
        src={member.imageUrl}
        alt={member.name}
        width={128}
        height={128}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold">{member.name}</h3>
      <p className="text-gray-400">{member.role}</p>
    </div>
  );
}