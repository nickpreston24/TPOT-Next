### Alpha Checklist

- [x] Re-attach the Upload button from TPOT-Toolbox
  - [ ] **Optional (Setting)** Create a modal asking "Edit this now?" (tickbox) - [Y] runs conversion and loads into Editor  [N] Uploads to Firebase Storage (ignoring conversion)

#### Wordpress Identification and Association:

  - [ ] Update the FIREBASES's draft state according to the wordpress_page_id AND the current user - both must be correct or throw an Error.
  - [ ] Associate a firebase user with a wp_author_id
  - [x] Then, associate a session with a wp_author_id once it's reached the 'published/draft level' ('draft' being the level right before being Victor & Translation) 
  - [x] FINALLY, update the Checkout State of a finalized paper to 'published' status.  (In wordpress, this will depend on the author for a final publish, e.g. Victor)
    - [ ] ^^ Here, we'll have to pull down all `wpapi.papers(author)` and filter sessions by the current `authorId`, then if some Papers exist that we don't have a Session for, create that Session as `published` because they have already been finalized.  We don't have enable these Sessions in the Checkout Table, in fact it probably would be best to have those specific published Papers available for view in the user's `Account`, that way there's minimal effort or confusion.

#### Conversion Options
- [x] **Optional** In functions/uploader.js, decide which html converter you're going to use: (draftjs-to-html or draft-js-export-html).  Probably the former.
- [x] editorref.current.editor.setData(`<h1></h1>`)
