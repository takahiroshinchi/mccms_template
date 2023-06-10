import { formatDate } from '@/libs/utils';
import { IconClock } from '@tabler/icons-react';
import Image from 'next/image';
import styles from './index.module.css';

type Props = {
  date: string;
};

export default function PublishedDate({ date }: Props) {
  return (
    <span className={`${styles.date}  bg-gray-200 pl-2`}>
      <IconClock size={16} color="black" stroke={3} strokeLinejoin="miter" />
      {formatDate(date)}
    </span>
  );
}
