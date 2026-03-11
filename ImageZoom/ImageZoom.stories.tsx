import type { StoryDefault, Story } from '@ladle/react'

import { ImageZoom } from './ImageZoom'

// More on how to set up stories at: https://ladle.dev/docs/stories
export default {
  title: 'Display/ImageZoom',
} satisfies StoryDefault

export const Default: Story = () => <ImageZoom />
