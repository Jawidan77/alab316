const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');

const topMenuEl = document.querySelector('#top-menu');
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

const subMenuEl = document.querySelector('#sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

//select and cache all the <a> elements inside of topMenuEl
const topMenuLinks = topMenuEl.querySelectorAll('a');

//attach a delegated 'click' event lestener to topMenuEl
topMenuEl.addEventListener('click', function (evt) {
evt.preventDefault();
if (evt.target.tagName !== 'A') return;
topMenuEl.forEach(link => link.classlist.remove('active'));
if (!evt.target.classList.contains('active')) {
  evt.target.classList.add('active');
} else {
  evt.target.classList.remove('active');
}
console.log(evt.target.textContent)
});


menuLinks.forEach((link)=>{
    const topMenuLink = document.createElement("a");
    topMenuLink.textContent = link.text;
    topMenuLink.setAttribute('href',link.href);
    topMenuEl.appendChild(topMenuLink);

})




// Attach event listener to topMenuEl
topMenuEl.addEventListener('click', function (evt) {
  // Prevent the default action of the clicked <a> element
  evt.preventDefault();

  // Ensure the clicked element is an <a> tag
  if (evt.target.tagName !== 'A') return;

  // Remove 'active' class from all <a> elements
  topMenuLinks.forEach(link => link.classList.remove('active'));

  // Add 'active' class to the clicked <a> element
  evt.target.classList.add('active');

  // Get the clicked link object from menuLinks array
  const linkObj = menuLinks.find(link => link.text === evt.target.textContent.toLowerCase());

  // If there are no sub-links, hide the submenu by setting top to 0 and return
  if (!linkObj || !linkObj.subLinks) {
    subMenuEl.style.top = '0';
    subMenuEl.innerHTML = ''; // Clear submenu content
    return;
  }

  // Otherwise, show the submenu by setting top to 100%
  subMenuEl.style.top = '100%';

  // Build the submenu based on the subLinks array
  buildSubMenu(linkObj.subLinks);
});

// Helper function to build the submenu
function buildSubMenu(subLinks) {
  // Clear the current contents of subMenuEl
  subMenuEl.innerHTML = '';

  // Iterate over subLinks array and create <a> elements
  subLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    subMenuEl.appendChild(a);
  });
}

// Attach event listener to subMenuEl to handle submenu interactions
subMenuEl.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (evt.target.tagName !== 'A') return;

  // Set the content of mainEl to the clicked submenu link
  mainEl.innerHTML = `<h1>${evt.target.textContent}</h1>`;
});















