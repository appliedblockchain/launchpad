import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import Button from './Button'

export default {
  title: 'ui-library/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const HelloWorld = Template.bind({})
HelloWorld.args = {
  children: 'Hello world!',
}

export const ClickMe = Template.bind({})
ClickMe.args = {
  children: 'Click me!',
}
