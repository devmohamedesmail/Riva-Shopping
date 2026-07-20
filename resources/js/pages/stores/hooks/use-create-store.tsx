import useImport from '@/hooks/use-import';
import React, { useState } from 'react'
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
export default function useCreateStore() {
    const {t,i18n,isRtl}=useImport()
    const [step, setStep] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [stepErrors, setStepErrors] = useState<number[]>([]);



    const schema = z.object({
       name: z.string().min(3, t('validation.is_required')),
        description: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email('Invalid email address').or(z.literal('')).optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().optional(),
        country: z.string().optional(),
        country_id: z.string().min(1, t('validation.is_required')),
        currency: z.string().optional(),
        timezone: z.string().optional(),
         
    });

    type FormValues = z.infer<typeof schema>;

    // Fields validated at each step (empty array = no validation needed)
    const STEP_FIELDS: (keyof FormValues)[][] = [
        ['name', 'description', 'phone', 'email'],  
        ['address', 'city', 'state', 'zip', 'country'], 
        [],   
        [],   
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        watch,
        control
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            name: '',
            description: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            country_id:'',
            currency: 'USD',
            timezone: 'UTC',
        },
    });

    const STEP_LABELS = [
        t('create_store.steps.info'),
        t('create_store.steps.location'),
        t('create_store.steps.categories'),
        t('create_store.steps.media'),
    ];

    // ─── Navigation ───────────────────────────────────────────────────────────

    const handleNext = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const fields = STEP_FIELDS[step];   
        const valid = fields.length === 0 || await trigger(fields);
        if (valid) {
            setStepErrors(e => e.filter(s => s !== step));
            setStep(s => s + 1);

        } else {
            setStepErrors(e => e.includes(step) ? e : [...e, step]);
        }
    };

    // ─── Submit ───────────────────────────────────────────────────────────────

    const onSubmit = (data: FormValues) => {
        setProcessing(true);
        const formData = new FormData();

        // Append all text fields
        Object.entries(data).forEach(([k, v]) => {
            if (v !== undefined && v !== null) {
                formData.append(k, String(v));
            }
        });

        // Append categories
        selectedCategories.forEach(id => formData.append('categories[]', String(id)));

        // Append images only if selected
        if (logoFile) formData.append('logo', logoFile);
        if (coverFile) formData.append('cover', coverFile);

        router.post('/create-store', formData as any, {
            forceFormData: true,
            onSuccess: () => toast.success(t('common.success')),
            onError: (errors) => {
                toast.error(t('common.error'))
                console.log(errors)
            },
            onFinish: () => setProcessing(false),
        });
    };

    const onError = (errs: typeof errors) => {
       
        const errorSteps: number[] = [];
        STEP_FIELDS.forEach((fields, i) => {
            if (fields.some(f => errs[f])) errorSteps.push(i);
        });
        setStepErrors(errorSteps);
        const firstErrorStep = STEP_FIELDS.findIndex(fields => fields.some(f => errs[f]));
        if (firstErrorStep !== -1) setStep(firstErrorStep);
        toast.error(t('create_store.toast.validation_error', 'Please fix the errors before submitting.'));
    };

    // ─── Category toggle ──────────────────────────────────────────────────────

    const toggleCategory = (id: number) =>
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id],
        );

    // Per-step error messages for the banner
    const currentStepErrorMsgs = STEP_FIELDS[step]
        .filter(f => errors[f])
        .map(f => errors[f]?.message as string);

  return {
    t,step,isRtl,STEP_LABELS,stepErrors,currentStepErrorMsgs,handleSubmit,onSubmit,onError,register,errors,control,selectedCategories,toggleCategory
    ,logoPreview,setLogoFile,setLogoPreview,coverPreview,setCoverFile,setCoverPreview,watch,setStep,handleNext,processing
  }
}
