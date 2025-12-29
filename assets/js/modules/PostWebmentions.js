class PostWebmentions extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const permalink = this.dataset.permalink;
    const postId = this.dataset.postId;
    try {
      fetch("https://webmention.io/api/mentions.jf2?target=https://zephnet.biz" + permalink)
        .then(response => response.json())
        .then(responseJson => { 
          let template = '<h3>Webmentions:</h3>';
          const placeholder = 'None yet!'; 
          let content = '';
          let replies, likes, reposts, bookmarks, mentions, rsvps;
          replies = likes = reposts = bookmarks = mentions = rsvps = [];
          if (responseJson.children.length){
            for (let mention of responseJson.children) {
              if (mention.author && mention.url && !mention.author.url) {
                mention.author.url = mention.url;
              }
              if (mention.author.name) {
                switch (mention['wm-property']) {
                  case 'in-reply-to':
                    replies.push(mention);
                    break;
                  case 'like-of':
                    likes.push(mention);
                    break;
                  case 'repost-of':
                    reposts.push(mention);
                    break;
                  case 'bookmark-of':
                    bookmarks.push(mention);
                    break;
                  case 'mention-of':
                    mentions.push(mention);
                    break;
                  case 'rsvp':
                    rsvps.push(mention);
                    break;
                }
              }
            }
          }
          if (likes.length) {
            content = this.renderLikesSection(likes);
          }
          this.innerHTML = template + (content.length ? content : placeholder);
        });
    } catch (e) {
    }
  }
  renderLikesSection(likes){
    let innerTemplate = '';
    if (likes.length == 1) {
      innerTemplate += this.renderAuthorImageAndLink(likes[0].author) + ' likes this.';
    }
    else {
      let i = 0;
      for (const like of likes){
        if (i != (likes.length - 1)) {
          innerTemplate += this.renderAuthorImageAndLink(like.author);
          if (likes.length > 2) {
            innerTemplate += ',';
          }
          innerTemplate += ' ';
        } else {
          innerTemplate += 'and ' + this.renderAuthorImageAndLink(like.author) + ' like this.'
        }
      }
    }
    return `
<div class="mention">
${innerTemplate}
</div>
`;
  }
  renderAuthorImageAndLink(author) {
    let wmPhotoUrl, wmAuthorName, wmAuthorUrl;
    wmPhotoUrl = wmAuthorName = wmAuthorUrl = '';
    wmPhotoUrl = author.photo;
    wmAuthorName = author.name;
    wmAuthorUrl = author.url;
    let inner = `
`;
    return `
<a href="${wmAuthorUrl}" class="minihcard">
<img src="${wmPhotoUrl}" loading="lazy" alt="" />
<span>${wmAuthorName}</span>
</a>
`;
  }
}

export { PostWebmentions }
