### Integration Checklist

- [x] Upon clicking the Checkout button, redirect to the scribe/edit page
- [ ] Upon loading the edit page, load whatever draft state thats in the context
  - [ ] Convert current Document Editor to a functional component or a Next variant of such.
  - [ ] Pass the resulting document draft state JSON/raw to editor state and pass it into RichEditor
  - [ ] Copy your uploader context code into a .js 
    - [ ] - See: uploader.js and complete it
    
  - [x] Test that a simple piece of data can be red from Checkout.js and updated from _app.js or other.

- [ ] Re-attach the Upload button from TPOT-Toolbox
  - [ ] Create a modal asking "Edit this now?" (tickbox) - [Y] runs conversion and loads into Editor  [N] Uploads to Firebase Storage (ignoring conversio)

- [x] Upon clicking the Publish button,
  - [x] If the Page hasn't been created yet (see slug, wp_post_id, etc.), create it and store the returned wordpress page Id AND User in firestore
  - [x] If the Page DOES exist, use wpapi's update method instead of Create().
  - [ ] Update the EDITOR's draft state according to the wordpress_page_id AND the current user - both must be correct or throw an Error.
- [ ] Update the FIREBASES's draft state according to the wordpress_page_id AND the current user - both must be correct or throw an Error.

  - [ ] Associate a firebase user with a wp_author_id
  - [ ] Then, associate a session with a wp_author_id once it's reached the 'published/staged level' ('staged' being the level right before being Victor & Translation) 
- [ ] fINALLY, update the Checkout State of a finalized paper to 'published' status.  (In wordpress, this will depend on the author for a final publish, e.g. Victor)

- [ ] **Optional** In functions/uploader.js, decide which html converter you're going to use: (draftjs-to-html or draft-js-export-html).  Probably the former.

### Bugs

- [ ] FIX: the case where working on an in-progress document, then switching to CheckoutTable you still see the Status 'In Progress'
- [ ] FIX: the case where clicking on Checkout while status is 'Checked-out' still shows "Checked out as Id ..." notification.
- [ ] FIX: When checking out, then immediately marking as 'Checked-out', you get the 'Not free to edit' notification

### Issues I have that need resolving

1. Show the User a loading spinner and message during transitioning to scribe/editor
2. I don't want to mess with custom buttons when we already have draftjs plugins static toolbar.
3. There's a periodic 'Saved' notification that doesn't need to pop up every so often, confusing users.  It should be a quiet text or * on the Editor or Checkout Table.
4. (Verify this of course)  There should be NO observables interacting with EditorStates.  It should sequentially load draft state, publish WP state, download docx's, etc.  The only reactive piece should be CheckoutTable.
5. We don't need to store html states (except cloud function conversions) at all, according to an article I red.  Just draft state will do for interim edits.  We can always run whichever draft-to-html exporter we're using to render html.
6. 

I have a checklist I'm outlining and going through as well today.  I can get this done, but firmly believe I need you to code freeze for the time being.  I can see you did a lot of good work and I'm springboarding off of it, but I don't want another UI adventure (custom buttons, loading + redirects that may confuse user when it could just involve a hide/collapse).  Getting tired of it.  I'm regretting not just doing this myself.  It's been 2 years and it's on both our heads now.

We have the wpapi not working for some reason, which is not good.  Ronnie has not yet responded to me, which concerns me.  I need to make headway on this project, as I believe a) I was the original promisee, and b) I red from TPOT that it's wrong to defer our responsibilities to others.  That's why I think this went south for so long, which is my fault for being in such unbelief, pride and fear.

If this doesn't get done, it's on me.  You've done well, but I need to finish this.  If I need your consultation on a weird bug, I'll ask.  But for now, I'm just going to stitch as many pieces together as I can, including publishing and see what we get.


### Convo on undefined Draft var

> MP:
Questions:
1) Why is DocumentEditor running (initializing) twice - one pass with draft as undef and the next pass with a value?
2) Is this a store issue or a parent component render issue?


> BP
1) Because the props it is breaking down are undefined initially. It has to wait until the data comes in from a firestorter fetch.

2) I would consider it a child component render issue. It just needs to render something, like a spinner wheel, until (props.data?) comes in from firestorter.
Ok, my initial thought would just be to fetch .draft upon initialization, straight from Storage, if I have to, in spite of a spinner wheel, which I figure to be an issue of render timing from the redirect.
If you force a fetch from firestorter, you loose the reactivity of the data. The reason why I clobbered that in the way I did, was so that the subscriber would not get dropped. I just never did a check for if the props were null and to render a spinner in its place. At the time, I was frustrated that I was loosing the reactive data. Once I had a solution that preserved it, I moved on.

You are good at checking props. For this class (and possibly others), maybe you can add in the logic to default to another component in the render component that isn't dependent on prop data. Then switch it in the render function when ready.

>MP
Yeah, ok. I'll try that as well.