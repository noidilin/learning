import { cva, type VariantProps } from 'class-variance-authority'
import Image from 'next/image'
import type * as React from 'react'
import type { IntegrationsType } from '@/app/(home)/integrations'
import { cn } from '@/lib/utils'
import { H3, Paragraph } from './typography'

const assetWallVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default: 'gap-4 pb-4',
      outline: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function AssetCol({
  className,
  variant,
  integrations,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof assetWallVariants> & { integrations: IntegrationsType }) {
  return (
    <div className={cn(assetWallVariants({ variant }), className)} {...props}>
      {integrations.map((integration) => (
        <div
          key={integration.name}
          className='rounded-3xl border border-foreground/10 bg-neutral-900 p-6'
        >
          <div className='flex justify-center'>
            <Image
              src={integration.icon}
              alt={`${integration.name} icon`}
              className='size-24'
            />
          </div>
          <H3 className='mt-6 text-center text-3xl'>{integration.name}</H3>
          <Paragraph className='mt-2 text-center text-foreground/50'>
            {integration.description}
          </Paragraph>
        </div>
      ))}
    </div>
  )
}

export { AssetCol }
