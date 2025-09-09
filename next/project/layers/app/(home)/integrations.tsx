import * as motion from 'motion/react-client'
import { AssetCol } from '@/components/ui/asset-col'
import { Tag } from '@/components/ui/tag'
import { H2, Paragraph } from '@/components/ui/typography'
import figmaIcon from '@/public/images/figma-logo.svg'
import framerIcon from '@/public/images/framer-logo.svg'
import githubIcon from '@/public/images/github-logo.svg'
import notionIcon from '@/public/images/notion-logo.svg'
import relumeIcon from '@/public/images/relume-logo.svg'
import slackIcon from '@/public/images/slack-logo.svg'

const integrations = [
  {
    name: 'Figma',
    icon: figmaIcon,
    description: 'Figma is a collaborative interface design tool.',
  },
  {
    name: 'Notion',
    icon: notionIcon,
    description: 'Notion is an all-in-one workspace for notes and docs.',
  },
  {
    name: 'Slack',
    icon: slackIcon,
    description: 'Slack is a powerful team communication platform.',
  },
  {
    name: 'Relume',
    icon: relumeIcon,
    description: 'Relume is a no-code website builder and design system.',
  },
  {
    name: 'Framer',
    icon: framerIcon,
    description: 'Framer is a professional website prototyping tool.',
  },
  {
    name: 'GitHub',
    icon: githubIcon,
    description: 'GitHub is the leading platform for code collaboration.',
  },
]

export type IntegrationsType = typeof integrations

export default function Integrations() {
  return (
    <section className='mx-auto max-w-10/12 overflow-hidden py-24'>
      <div className='grid items-center lg:grid-cols-2 lg:gap-16'>
        <div>
          <Tag variant={'outline'}>Integrations</Tag>
          <H2 className='mt-6 max-w-2xl border-0 text-6xl'>
            Plays well with <span className='text-lime-400'>others</span>
          </H2>
          <Paragraph className='mt-4 text-lg text-foreground/50'>
            Layers seamlessly connects with your favorite too it easy to plug
            into any workflow and collaborate platforms.
          </Paragraph>
        </div>
        <div className='mt-8 grid h-[400px] gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] md:grid-cols-2 lg:mt-0 lg:h-[800px]'>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-50%' }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <AssetCol integrations={integrations} />
          </motion.div>
          <motion.div
            initial={{ y: '-50%' }}
            animate={{ y: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <AssetCol
              integrations={integrations.slice().reverse()}
              className='hidden md:flex'
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
