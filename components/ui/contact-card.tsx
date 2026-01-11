import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, PlusIcon } from 'lucide-react';

type ContactInfoProps = React.ComponentProps<'div'> & {
    icon: LucideIcon;
    label: string;
    value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
    title?: string;
    description?: string;
    contactInfo?: ContactInfoProps[];
    formSectionClassName?: string;
};

export function ContactCard({
    title = 'Contact With Us',
    description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
    contactInfo,
    className,
    formSectionClassName,
    children,
    ...props
}: ContactCardProps) {
    return (
        <div
            className={cn(
                'bg-background/50 backdrop-blur-md border border-white/10 relative grid h-full w-full shadow-lg md:grid-cols-2 lg:grid-cols-3 rounded-xl overflow-hidden',
                className,
            )}
            {...props}
        >
            <PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-muted-foreground/50" />
            <PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-muted-foreground/50" />
            <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-muted-foreground/50" />
            <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-muted-foreground/50" />

            <div className="flex flex-col justify-between lg:col-span-2">
                <div className="relative h-full space-y-4 px-6 py-8 md:p-8">
                    <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
                        {title}
                    </h1>
                    <p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg">
                        {description}
                    </p>
                    <div className="grid gap-6 mt-8 md:grid md:grid-cols-2 lg:grid-cols-3">
                        {contactInfo?.map((info, index) => (
                            <ContactInfo key={index} {...info} />
                        ))}
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    'bg-muted/20 flex h-full w-full items-center border-t border-white/10 p-6 md:col-span-1 md:border-t-0 md:border-l',
                    formSectionClassName,
                )}
            >
                {children}
            </div>
        </div>
    );
}

function ContactInfo({
    icon: Icon,
    label,
    value,
    className,
    ...props
}: ContactInfoProps) {
    return (
        <div className={cn('flex items-center gap-3', className)} {...props}>
            <div className="bg-primary/10 rounded-lg p-3 text-primary">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="font-medium text-foreground">{label}</p>
                <p className="text-muted-foreground text-xs">{value}</p>
            </div>
        </div>
    );
}
