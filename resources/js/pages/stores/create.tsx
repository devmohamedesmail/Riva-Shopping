import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import MainLayout from '@/layouts/main-layout';
import Hero from './components/hero';
import StepBar from './components/step-bar';
import StoreInfoStep from './components/store-info-step';
import StoreLocationStep from './components/store-location-step';
import StoreCategoriesStep from './components/store-categories-step';
import StoreMediaStep from './components/store-media-step';
import useImport from '@/hooks/use-import';
import useCreateStore from './hooks/use-create-store';







// ─── Main page ────────────────────────────────────────────────────────────────

export default function CreateStore() {
   const {t,step,isRtl,STEP_LABELS,stepErrors,currentStepErrorMsgs,handleSubmit,onSubmit,onError,register,errors,control,selectedCategories,toggleCategory
    ,logoPreview,setLogoFile,setLogoPreview,coverPreview,setCoverFile,setCoverPreview,watch,setStep,handleNext,processing
   }=useCreateStore()

    return (
        <MainLayout>
            <Head title={t('create_store.title')} />
            <Hero />

            <div className="min-h-screen bg-gray-50 py-12 px-4" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">

                        <StepBar current={step} stepErrors={stepErrors} labels={STEP_LABELS} />

                        {/* Error banner */}
                        {currentStepErrorMsgs.length > 0 && (
                            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800 p-4">
                                <p className="text-sm font-semibold text-red-700 dark:text-red-400 flex items-center gap-2 mb-2">
                                    <AlertCircle size={15} /> {t('create_store.validation.fix_errors')}
                                </p>
                                <ul className="text-xs text-red-600 dark:text-red-400 space-y-1 list-disc list-inside">
                                    {currentStepErrorMsgs.map((msg, i) => <li key={i}>{msg}</li>)}
                                </ul>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            {step === 0 && (
                                <StoreInfoStep register={register} errors={errors} />
                            )}
                            {step === 1 && (
                                <StoreLocationStep register={register} errors={errors} control={control} />
                            )}

                            {step === 2 && (
                                <StoreCategoriesStep
                                    selectedCategories={selectedCategories}
                                    toggleCategory={toggleCategory}
                                />
                            )}
                            {step === 3 && (
                                <StoreMediaStep
                                    logoPreview={logoPreview}
                                    setLogoFile={setLogoFile}
                                    setLogoPreview={setLogoPreview}
                                    coverPreview={coverPreview}
                                    setCoverFile={setCoverFile}
                                    setCoverPreview={setCoverPreview}
                                    watch={watch}
                                    selectedCategories={selectedCategories}
                                />
                            )}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                                {step > 0 ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(s => s - 1)}
                                        className="gap-2"
                                    >
                                        <ChevronLeft size={16} /> {t('create_store.nav.previous')}
                                    </Button>
                                ) : <div />}

                                {step < STEP_LABELS.length - 1 ? (
                                    <Button
                                        type="button"
                                        onClick={handleNext}
                                        className="gap-2 bg-orange-500 hover:bg-orange-600 text-white border-0"
                                    >
                                        {t('create_store.nav.next')} <ChevronRight size={16} />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="gap-2 bg-orange-500 hover:bg-orange-600 text-white border-0 min-w-36"
                                    >
                                        {processing
                                            ? t('create_store.nav.submitting')
                                            : `🚀 ${t('create_store.nav.submit')}`
                                        }
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}