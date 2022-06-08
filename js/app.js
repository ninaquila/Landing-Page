// variables
const navigation = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const fragment = document.createDocumentFragment();

// building the nav bar
function buildNav() {
    //looping to count sections & present them

    for (let i = 0; i < sections.length; i++) {
        const sectionId = sections[i].getAttribute('id');
        const navItem = document.createElement('li');
        const sectionTitle = sections[i].getAttribute('data-nav');
        navItem.innerHTML = makeNav(sectionId, sectionTitle);
        //add sections to document

        fragment.appendChild(navItem);
    }

    //add doc to ul on html
    const navBarMaker = document.getElementById('navbar__list')
    navBarMaker.appendChild(fragment);
};

let buildListItems = (sections, navigation) => {
        //for..of loop to create list item for every item in the secList and attach to the given navList
        for (const section of sections) {
            const newElement =
                `<li data-link=${section.getAttribute('id')} class="menu__link">
                <a href="#${section.getAttribute('id')}">${section.getAttribute('data-nav')}</a>
            </li>`;
            navigation.insertAdjacentHTML('beforeend', newElement);
        }
    }
    //making the sections their own
function makeNav(id, name) {
    const idLinkName = `<a class ="menu__link" data-id="${id}">${name}</a>`;
    return idLinkName;
};

// Add making 'active' sections 

// putting the active offset
const offset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

// remove the active class
const removeActive = (section) => {
    section.classList.remove('your-active-class');
    section.style.cssText = "background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)";
};

// adding the active class
const addActive = (conditional, section) => {
    if (conditional) {
        section.classList.add('your-active-class');
        section.style.cssText = "background-color: rgba(51,51,51,0.8)";
    };
};

//implementating the actual function & mathing it out
const sectionActivation = () => {
    sections.forEach(section => {
        const elementOffset = offset(section);

        inviewport = () => elementOffset < 70 && elementOffset >= -70;

        removeActive(section);
        addActive(inviewport(), section);
    });
};

window.addEventListener('scroll', sectionActivation);

// Linked scrolling to the event

const scroll = () => {

    const links = document.querySelectorAll('.navbar__menu a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            for (i = 0; i < sections; i++) {
                sections[i].addEventListener("click", sectionScroll(link));
            }
        });
    });

};

scroll();

buildNav();

// Set & show sections as active 
window.onscroll = () => {
    sectionActivation(sections);
};