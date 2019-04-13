# mega-material

Making Elements Great Again, Material Style!

[Demo](https://captaincodeman.github.io/mega-material/)

## Summary

A lightweight set of Web Components (using custom elements and ShadowDOM)
implementing Google's [Material Design System](https://material.io/) that
should be compatible with any web-framwork on modern ever-green browsers.

Fast, efficient, easy to consume and easily themeable.

## Status

The following components have been implemented or are in progress:

* [ ] Bottom Navigation
* [X] Button
* [X] Card
* [X] Checkbox
* [ ] Chips
* [X] Dialog
* [X] Drawer
* [X] FAB
* [X] Icon
* [X] Icon Button
* [X] Linear Progress
* [X] List
* [ ] Radio Button
* [X] Slider
* [X] Snackbar
* [X] Switch
* [ ] Tabs
* [ ] TextField
* [X] Top-App-Bar

More work needs to be done on theming, events and tidying up the components.

## Background

Google already provide an official Material Design web implementation:

[https://github.com/material-components/material-components-web](https://github.com/material-components/material-components-web)

This is designed to be used directly or act as a foundation that can be used
to implement any framework-specific set of Material Design components by the
creation of adaptor classes and re-use of the provided global BEM styles.

So a set of Material Design components for React, another for Angular, one for
Vue, and so on with all the other web-frameworks.

Unfortunately, there are several issues with this approach:

The extra code to make it adaptable to multiple frameworks means there is more
code than necessary for whichever framework you are using. The contributes to
the JavaScript payload being larger than it needs to be - the full minified JS
payload is 473Kb.

Because styles are global they need to be unique and the approach to this is
to use BEM style classes. Lots of SASS templating allow customization but at
the cost of bloat - the full set of minified CSS is 266Kb.

Implementing any elements in your app directly requires correctly matching up
large blocks of HTML and CSS classes. While the framework-specific versions can
create easier to consume components (at the cost of additional code) all design
and implementation is then tied heavily to that framework.

It relies on abstractions and most abstractions are leaky. In this case there
is an assumption that all HTML and styling is global to the page. So it doesn't
work nicely with ShadowDOM.

Work has been progressing on a Web Component version, the snapily named:

[https://github.com/material-components/material-components-web-components](https://github.com/material-components/material-components-web-components)

But progress seems to be slow and there are challenges trying to adapt a system
that has been fundamentally designed under the an assumption that global styling
will be available into an implementation that actively prevents global styling.

This seems to be a real missed opportunity given that a single, web-component
based implementation could be the _only_ version required. It could be re-used
by _any_ framework without extra JavaScript and with less bloated styling (due
to the isolation that ShadowDOM provides). By encapsulating the internal HTML
and styling the components should provide a simpler and easier-to-consume API
that would be consistent across frameworks.

## Plans

In fairness, Google are trying to support more browsers than I am but I don't
think it's worth compromising the components for IE and with Edge switching to
use the Blink engine, all modern browsers will fully support Web Components.

RTL support using the `dir` attribute is old school and should be implemented
using newer `start` &amp; `end` styles (when available). RTL support is lower
priority for me though.

JavaScript needs to be enabled to use Web Components so it makes no sense to
recreate the CSS-only styling of the offical implementation.

SASS makes creating styles easy which maybe why it makes it easy to create _too
many_ styles. Instead of applying the same style properties to different classes
(SASS mixins) we want to re-use elements internally to avoid repetition.

Customization and theming should be done using CSS variables although the new
`part` feature may be useful for this in future.
