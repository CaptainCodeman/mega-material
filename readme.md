# mega-material

Making Elements Great Again, Material Style

## Summary

An attempt at making a web-component based library of, well, components
for the web. Specifically, components that implement Google's Material
Design look and feel as lightweight as possible.

## Background

Material design, what a cruel master you are. After years of pushing the
boundaries with things like paper-elements we finally have Web Components
available in all browsers (that matter) and we even have a new lightweight
templating system called lit-html with a useful lit-element base class.

Now all that's missing is the revamped, slick, small, fast web component
implementations of Material Design that we were promised!

[insert screetching halt sound here]

Yeah, it's not happening. Instead, we're getting the Material Design Web
version with wrappers around them. That means all the bloated BEM styles
that are completely unecessary when you have style isolation provided by
ShadowDOM, plus the "we built our own component lifycycle" approach that
probably makes sense if you're using React or Angular or some other "living
in the past" framework but again - we have a component lifecycle model all
built into browsers now. Can't we use that? Why do we have to ship more
bytes?!

So two things: the MWC components have taken an age. It's literally been
years and there seems to be very little progress and no desire for them
to accept help or merge any pull requests but their own. I'm not convinced
they will ever see the light of day. When or if they do, they are going to
be much larger than they need to be because of the issues above.

WTF is wrong with Google? They have people selling one future and then
another undermining it. Done properly, there would only need to be one set
of components developed. No foundation classes or framework adaptors or
other "hello-world enterprise edition" over engineering to ship a bloated
set of components. Seriously, the full thing is 473Kb of JS and 266Kb of
CSS ... and those are both minified!

Now in "React world", that may be acceptable. But seriously, c'mon ...
even the demo pages load 2.9Mb to show a few buttons. Was this sponsored
by the Android team to make the web look bad?

Google, in future, don't hire react developers to build a web technology
library, hire _web_ devlopers - there is a difference.

## Plans

Use PostCSS in Rollup to add prefixes
Support RTL using `start` &amp; `end` when available (instead of left / right)
Drop anything todo with IE / Edge
Drop all CSS only styling (makes no sense if we're running Web Components)
Drop style mixins - style and behavior for things like notched-outline should only exist once
Provide CSS variable equivalents of SASS mixins (e.g. for setting drawer width etc...)
