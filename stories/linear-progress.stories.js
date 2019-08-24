import { storiesOf } from '@storybook/polymer';
import { withKnobs, number, boolean } from '@storybook/addon-knobs/polymer';

import '../docs/linear-progress.js'

const percentageRange = {
  range: true,
  min: 0,
  max: 1,
  step: 0.01,
};

storiesOf('linear-progress', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const el = document.createElement('mega-linear-progress');
    el.progress = number('Progress', 0.5, percentageRange);
    el.buffer = number('Buffer', 0.8, percentageRange);
    el.reverse = boolean('Reversed', false);
    el.indeterminate = boolean('indeterminate', true);
    return el;
  })
