# Eventful

- Eventful is more than just a ticketing platform; it's your passport to a world of unforgettable moments. From pulsating concerts to captivating theater performances, and thrilling sports events to enlightening cultural gatherings, we curate a diverse array of experiences that cater to every taste and passion.
Requirements and Implementation Guide
- Authentication and Authorization: Event creators and users who can apply for those events should be authenticated. Creators can see events they have created and those that have applied to their events and eventees should be able to see all the events they can attend and also attend
- QR Code Generation: Eventful should be able to generate QR codes for eventees when the tickets are bought. This QR code would be used to verify that the eventee is valid and can have access to this event.
- Shareability: When events are created on Eventful, eventees and creators should be able to share these events on any social media platform
- Notifications: Eventful should be able to remind eventees of events that are coming up. When creators are creating the events, they should be able to set the reminder; Eg 1 day before the event or 1 week. Eventees should also be able to set their own reminder for the events. Make it as flexible as possible
- Analytics: Eventful should be able to provide creators the ability to see how many attendees they have had all the time and specific to events. How many tickets have been bought all the time and specific to events. How many eventees bought tickets and had their QR code scanned for specific events

# Best Practices:
- You are required to build with either Nodejs(TypeScript) or Python.
- Don't always hit the DB, use a cache layer.
- Ensure you write unit and integration tests where possible
- Implement rate limiting
- It would be better if you could spec and document the API with OpenAPI using something like https://stoplight.io/

https://sneez.stoplight.io/docs/altschool-capstone-project/
