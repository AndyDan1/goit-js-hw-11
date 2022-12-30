export function cardLayout(data) {
  const layout = data
    .map(item => {
      return `
    <div class="photo-card">
     <a href="${item.largeImageURL}"> <img src="${item.webformatURL}"  alt="${item.tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${item.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${item.views}
        </p>
        <p class="info-item">
        
          <b>Comments</b>
          ${item.comments}
        </p>
        <p class="info-item">
          <b>downloads</b>
          ${item.downloads}
        </p>
      </div>
    </div>
    `;
    })
    .join('');
  return layout;
}