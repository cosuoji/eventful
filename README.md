# eventful

Ticketing Platform

# Eventful

Eventful is more than just a ticketing platform; it's your passport to a world of unforgettable moments. From pulsating concerts to captivating theater performances, and thrilling sports events to enlightening cultural gatherings, we curate a diverse array of experiences that cater to every taste and passion.

# Requirements and Implementation Guide

- QR Code Generation: Eventful should be able to generate QR codes for eventees when the tickets are bought. This QR code would be used to verify that the eventee is valid and can have access to this event.

- Notifications: Eventful should be able to remind eventees of events that are coming up. When creators are creating the events, they should be able to set the reminder; Eg 1 day before the event or 1 week. Eventees should also be able to set their own reminder for the events. Make it as flexible as possible


# Best Practices:
Don't always hit the DB, use a cache layer.
Ensure you write unit and integration tests where possible
POST MAN API



# IDEAS 
- QR code will contain link to the event and the event ID?
- cron jobs for reminders
- Show list of people that have signed up
- 1 week, 1 day, 1hr before, dropdown front end, cron jobs backend
