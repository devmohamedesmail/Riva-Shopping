import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
   
} from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';

declare function route(name: string, params?: any): string
export default function DeleteAllDialog({ store }: any) {
    const { t, i18n } = useTranslation()
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const handleDeleteAll = () => {
        router.visit(`/vendor/delete/all/products/${store.id}`,{
             onSuccess: () => {
                toast.success(t('common.success'))
            }
        })
       
    }
    return (
        <div>
            <Button variant='destructive' onClick={() => setOpenDeleteDialog(true)}>{t("common.delete-all")}</Button>
            <Dialog open={openDeleteDialog} onOpenChange={() => setOpenDeleteDialog(false)}>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-base">

                            <span className="line-clamp-1">

                            </span>
                        </DialogTitle>
                    </DialogHeader>


                    <div className="flex flex-col items-center text-center gap-3 mb-6">
                        <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                            <AlertTriangle size={26} className="text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t("common.delete-title")}</h3>
                            <p className="text-sm text-gray-500">{t('common.delete_all_confirm')}</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 border-gray-200" onClick={() => setOpenDeleteDialog(false)}>{t('common.cancel')}</Button>
                        <Button className="flex-1 bg-red-500 hover:bg-red-600 shadow-sm text-white border-0"

                            onClick={() => handleDeleteAll()}
                        >{t('common.delete')}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
