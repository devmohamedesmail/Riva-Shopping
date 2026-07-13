import React from 'react'

export default function SectionCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs overflow-hidden">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Icon size={14} className="text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h3>
            </div>
            <div className="p-6">{children}</div>
        </div>
  )
}
