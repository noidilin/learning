import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tag } from '@/components/ui/tag'
import { H2 } from '@/components/ui/typography'
import avatar1 from '@/public/images/avatar-ashwin-santiago.jpg'
import avatar2 from '@/public/images/avatar-florence-shaw.jpg'
import avatar3 from '@/public/images/avatar-lula-meyers.jpg'
import avatar4 from '@/public/images/avatar-owen-garcia.jpg'
import { Keycap } from '@/components/ui/keycap'

const features = [
  'Asset Library',
  'Code Preview',
  'Flow Mode',
  'Smart Sync',
  'Auto Layout',
  'Fast Search',
  'Smart Guides',
]

export default function Features() {
  return (
    <section className='mx-auto max-w-10/12 py-24'>
      <div className='flex justify-center'>
        <Tag variant='outline'>Features</Tag>
      </div>
      <H2 className='mx-auto mt-6 max-w-2xl border-0 text-center text-6xl'>
        Where power meets <span className='text-lime-400'>simplicity</span>
      </H2>
      <div className='mx-auto mt-12 grid max-w-9/12 grid-cols-1 gap-8 md:max-w-full md:grid-cols-4 lg:grid-cols-3 xl:max-w-6xl'>
        <Card className='group md:col-span-2 lg:col-span-1'>
          <CardContent className='flex aspect-video items-center justify-center'>
            <div className='flex justify-center -space-x-2 transition duration-500'>
              <Avatar className='z-40'>
                <AvatarImage src={avatar1.src} alt='ashwin-santiago' />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <Avatar className='z-30 delay-100'>
                <AvatarImage src={avatar2.src} alt='florence-shaw' />
                <AvatarFallback>FS</AvatarFallback>
              </Avatar>
              <Avatar className='z-20 delay-200'>
                <AvatarImage src={avatar3.src} alt='lula-meyers' />
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              <Avatar className='z-10 delay-300'>
                <div className='relative inline-flex size-full items-center justify-center gap-1 rounded-full bg-neutral-700'>
                  <AvatarImage
                    src={avatar4.src}
                    alt='owen-garcia'
                    className='absolute size-full rounded-full opacity-0 transition duration-500 group-hover:opacity-100'
                  />
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span
                      key={i}
                      className='inline-flex size-1.5 rounded-full bg-foreground'
                    ></span>
                  ))}
                </div>
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle>Real-time Collaboration</CardTitle>
            <CardDescription>
              Work together seamlessly with conflict-free team editing
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className='group md:col-span-2 lg:col-span-1'>
          <CardContent className='flex aspect-video items-center justify-center'>
            <div className='flex justify-center'>
              <p className='text-center text-4xl font-extrabold text-foreground/20 transition duration-500 group-hover:text-foreground/10'>
                We&apos;ve achieved{' '}
                <span className='relative bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                  <span>incredible</span>
                  <video
                    src='/images/gif-incredible.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 rounded-2xl opacity-0 shadow-2xl transition duration-500 group-hover:opacity-100'
                  />
                </span>{' '}
                growth this year
              </p>
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle>Interactive Prototyping</CardTitle>
            <CardDescription>
              Engage your clients with prototypes that react to user actions
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className='group md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto'>
          <CardContent className='flex aspect-video items-center justify-center'>
            <div className='flex justify-center gap-4'>
              <Keycap className='w-28'>shift</Keycap>
              <Keycap className='delay-150'>alt</Keycap>
              <Keycap className='delay-300'>C</Keycap>
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle>Keyboard Quick Actions</CardTitle>
            <CardDescription>
              Powerful commands to help you create designs more quickly
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className='mt-8 flex flex-wrap justify-center gap-3'>
        {features.map((feature) => (
          <div
            key={feature}
            className='group inline-flex items-center gap-3 rounded-2xl border-foreground/10 bg-neutral-900 px-3 py-1.5 transition duration-500 hover:scale-105 md:px-5 md:py-2'
          >
            <span className='inline-flex size-5 items-center justify-center rounded-full bg-lime-400 text-xl text-neutral-950 transition duration-500 group-hover:rotate-180'>
              &#10038;
            </span>
            <span className='font-medium md:text-lg'>{feature}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
