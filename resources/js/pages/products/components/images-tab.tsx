import React from 'react'
import {UploadCloud,Trash2} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
export default function ImagesTab({activeTab,previewImages,fileInputRef,handleImageChange,setPreviewImages}:any) {
 const {t}=useTranslation()
    return (
      <div className={activeTab === 'media' ? 'block space-y-4' : 'hidden'}>
                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-800/20">
                            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                                <UploadCloud size={24} className="text-orange-500" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{t('vendor.products.pickupimage')}</h3>
                            <p className="text-xs text-gray-500 mb-4">PNG, JPG up to 2MB</p>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" multiple accept="image/*" />
                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="bg-white">
                              {t('vendor.products.browse-files')}
                            </Button>
                        </div>
                        

                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
                                {previewImages.map((img:any, idx:any) => (
                                    <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm group">
                                        <img src={img.url} className="w-full h-full object-cover" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button type="button" onClick={() => setPreviewImages((p:any)=> p.filter((_:any, i:any) => i !== idx))} className="text-white hover:text-red-400 p-1">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
  )
}
