const catalog = require("./catalog.json");

const ORIGIN = "https://life.ayushrai.site";

function pagesFor(query) {
  const pages = catalog.pages;
  const q = String(query || "").trim().toLowerCase();
  if (!q) return pages.slice(0, 5);
  const words = q.split(/\s+/).filter((word) => word.length > 2);
  const hits = pages.filter((page) => {
    const hay = `${page.name} ${page.description} ${page.keywords || ""}`.toLowerCase();
    return hay.includes(q) || words.some((word) => hay.includes(word));
  });
  return (hits.length ? hits : pages.slice(0, 3)).slice(0, 8);
}

function nlweb(query) {
  return {
    _meta: {
      response_type: "item_list",
      version: "0.1",
    },
    query: String(query || ""),
    results: pagesFor(query).map((page) => ({
      url: page.url,
      name: page.name,
      description: page.description,
    })),
  };
}

function profileText() {
  return [
    `${catalog.name} is an ${catalog.roles.join(", ")} based in ${catalog.location}.`,
    catalog.tagline,
    `Email: ${catalog.email}. Phone: ${catalog.telephone}.`,
    `Source repository: ${catalog.source}.`,
    `Canonical site: ${ORIGIN}/`,
  ].join(" ");
}

function toolResult(surface, name, args) {
  if (surface === "docs") {
    if (name === "list_docs") {
      return catalog.pages
        .map((page) => `- ${page.name}: ${page.url}`)
        .join("\n");
    }
    const query = args && args.query ? args.query : "";
    const hits = pagesFor(query);
    return hits
      .map((page) => `# ${page.name}\n\n${page.description}\n\n${page.url}`)
      .join("\n\n");
  }
  if (name === "get_contact") {
    return `Email ${catalog.email}. Phone ${catalog.telephone}. Contact page: ${ORIGIN}/sites/contact/. Booking: https://calendly.com/ayushrai0211 and https://cal.com/ayush-rai-02. Mentoring: https://topmate.io/ayush_rai02.`;
  }
  if (name === "book_a_conversation") {
    return `Booking links for ${args && args.topic ? args.topic : "a conversation"}: https://calendly.com/ayushrai0211 and https://cal.com/ayush-rai-02. This does not create a booking. The caller opens one of those links.`;
  }
  if (name === "search_public_facts") {
    return pagesFor(args && args.query).map((page) => `${page.name}: ${page.description} (${page.url})`).join("\n");
  }
  return profileText();
}

module.exports = {
  ORIGIN,
  catalog,
  pagesFor,
  nlweb,
  profileText,
  toolResult,
};
