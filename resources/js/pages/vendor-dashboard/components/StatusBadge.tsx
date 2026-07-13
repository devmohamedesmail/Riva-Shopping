import React from 'react'
import { useTranslation } from 'react-i18next';
import {XCircle,Clock,Loader2,CheckCircle2} from 'lucide-react'
export default function StatusBadge({ status }: { status: string }) {
 
   const { t } = useTranslation();
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    pending: { cls: 'bg-amber-100 text-amber-700', icon: <Clock size={11} /> },
    processing: { cls: 'bg-blue-100 text-blue-700', icon: <Loader2 size={11} /> },
    delivered: { cls: 'bg-green-100 text-green-700', icon: <CheckCircle2 size={11} /> },
    cancelled: { cls: 'bg-red-100 text-red-700', icon: <XCircle size={11} /> },
  };
  const { cls, icon } = map[status] ?? map.pending;
    return (
    <div>StatusBadge</div>
  )
}
