
const searchInput = document.getElementById("searchInput");
const listingContainer = document.getElementById("listingContainer");

searchInput.addEventListener("input", async () => {
    const query = searchInput.value;

    const res = await fetch(`/listings/search/basic?query=${query}`);
    const data = await res.json();

    listingContainer.innerHTML = "";

    data.forEach(listing => {
        const card = `
        <a href="/listings/${listing._id}" class="listing-link">
            <div class="card col listing-card">

                <img 
                    src="${listing.image?.url || 'https://via.placeholder.com/600'}"
                    class="card-img-top"
                    alt="listing_image"
                    style="height: 20rem"
                />

                <div class="card-body">
                    <p class="card-text">
                        <b>${listing.title}</b><br />
                        ₹${listing.price.toLocaleString("en-IN")}/night
                    </p>
                </div>

            </div>
        </a>
        `;
        listingContainer.innerHTML += card;
    });
});

