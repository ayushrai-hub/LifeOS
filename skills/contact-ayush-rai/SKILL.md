---
name: contact-ayush-rai
description: Return Ayush Rai's published email, phone, and booking links from the contact page.
---

# Contact Ayush Rai

Use this skill only for contact details that are already public on https://life.ayushrai.site/sites/contact/.

## When to use

- The user wants an email, phone number, or a way to book time.
- The user asks about Topmate mentoring.

## When not to use

- The user wants you to send a message as Ayush.
- The user wants a residential address. The site does not publish one.

## Steps

1. Read the contact page or call `GET https://life.ayushrai.site/ask?query=How%20do%20I%20contact%20Ayush%20Rai`.
2. Give the email, phone, Calendly, Cal.com, and Topmate links that the page lists.
3. Point mentoring context at the career page rather than inventing availability.
