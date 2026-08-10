const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.04 }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("is-visible");
  });
}

const featureItems = Array.from(document.querySelectorAll(".feature-item"));
const featureImage = document.querySelector("#feature-image");
const featureTitle = document.querySelector("#feature-title");
const featureCopy = document.querySelector("#feature-copy");
const featurePoints = document.querySelector("#feature-points");

const updateFeature = feature => {
  featureItems.forEach(item => {
    const active = item === feature;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", active ? "true" : "false");
  });

  featureImage.style.opacity = "0.2";
  featureImage.style.transform = "scale(1.03)";

  window.setTimeout(() => {
    featureImage.src = feature.dataset.image;
    featureTitle.textContent = feature.dataset.title;
    featureCopy.textContent = feature.dataset.copy;

    const points = feature.dataset.points.split(",");
    featurePoints.innerHTML = "";
    points.forEach(point => {
      const li = document.createElement("li");
      li.textContent = point.trim();
      featurePoints.appendChild(li);
    });

    featureImage.style.opacity = "1";
    featureImage.style.transform = "scale(1)";
  }, 120);
};

if (featureItems.length && featureImage && featureTitle && featureCopy && featurePoints) {
  featureItems.forEach(item => {
    item.addEventListener("click", () => updateFeature(item));
  });
}

const contactModal = document.querySelector("#contact-modal");
const contactTriggers = Array.from(document.querySelectorAll(".contact-trigger"));

if (contactModal && contactTriggers.length) {
  const closeButtons = Array.from(contactModal.querySelectorAll("[data-close-contact='true']"));

  const openContactModal = () => {
    contactModal.classList.add("is-open");
    contactModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeContactModal = () => {
    contactModal.classList.remove("is-open");
    contactModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  contactTriggers.forEach(trigger => {
    trigger.addEventListener("click", openContactModal);
  });

  closeButtons.forEach(button => {
    button.addEventListener("click", closeContactModal);
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (!contactModal.classList.contains("is-open")) return;
    closeContactModal();
  });
}
