'use client'

import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Tag } from '@/components/ui/tag'
import { H2, H3, Paragraph } from '@/components/ui/typography'

const faqs = [
  {
    question: 'How is Layers different from other design tools?',
    answer:
      'Unlike traditional design tools, Layers prioritizes speed and simplicity without sacrificing power. Our intelligent interface adapts to your workflow, reducing clicks and keeping you in your creative flow.',
  },
  {
    question: 'Is there a learning curve?',
    answer:
      'Layers is designed to feel intuitive from day one. Most designers are productive within hours, not weeks. We also provide interactive tutorials and comprehensive documentation to help you get started.',
  },
  {
    question: 'How do you handle version control?',
    answer:
      'Every change in Layers is automatically saved and versioned. You can review history, restore previous versions, and create named versions for important milestones.',
  },
  {
    question: 'Can I work offline?',
    answer:
      "Yes! Layers includes a robust offline mode. Changes sync automatically when you're back online, so you can keep working anywhere.",
  },
  {
    question: 'How does Layers handle collaboration?',
    answer:
      'Layers is built for collaboration. You can invite team members to your projects, share feedback, and work together in real-time.',
  },
]

export default function Faqs() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <section className='mx-auto max-w-10/12 py-24'>
      <div className='flex justify-center'>
        <Tag variant='outline'>Faqs</Tag>
      </div>
      <H2 className='mx-auto mt-6 max-w-xl text-center text-6xl font-medium'>
        Questions? We&apos;ve got <span className='text-lime-400'>answers</span>
      </H2>
      <div className='mx-auto mt-12 flex max-w-xl flex-col gap-6'>
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className='rounded-2xl border border-foreground/10 bg-neutral-900 p-6'
          >
            <div
              className='flex items-center justify-between'
              onClick={() => setSelectedIndex(index)}
            >
              <H3 className='font-medium'>{faq.question}</H3>
              <Plus
                className={`shrink-0 text-lime-400 transition duration-300 ${selectedIndex === index && 'rotate-45'}`}
              />
            </div>
            <AnimatePresence>
              {selectedIndex === index && (
                <motion.div
                  initial={{ height: 0, marginTop: 0 }}
                  animate={{ height: 'auto', marginTop: 24 }}
                  exit={{ height: 0, marginTop: 0 }}
                  className='overflow-hidden'
                >
                  <Paragraph className='text-foreground/50'>
                    {faq.answer}
                  </Paragraph>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
