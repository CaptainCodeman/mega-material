import { storiesOf } from '@storybook/polymer';
import { withKnobs, boolean, text, color } from '@storybook/addon-knobs/polymer';

import '../docs/button.js'

storiesOf('button', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const el = document.createElement('mega-button');
    el.fullWidth = boolean('Full Width', false);
    el.raised = boolean('Raised', false);
    el.unelevated = boolean('Unelevated', false);
    el.outlined = boolean('Outlined', false);
    el.dense = boolean('Dense', false);
    el.disabled = boolean('Disabled', false);
    el.icon = text('Icon', 'favorite');
    el.label = text('Label', 'My Button');
    el.style.setProperty('--mega-theme-primary', color('Theme Color', '#6200ee'))
    return el;
  })
