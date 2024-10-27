# Documentation
## Prerequisites
First thing first, make sure you have done this:
1. Have PostgreSQL installed and `eventorganizer` database (import `eventorganizer.sql`)
2. Have NodeJS installed
3. Internet access

## Installation step
1. After that, prepare the project using this command in CMD/Terminal.
```Shell
git clone https://github.com/setiawanjoko/event-organizer.git
cd event-organizer
npm install 
cp .env-example .env
```

2. Then, using text editor edit `.env` file to match your database credentials.

3. Run your project
```Shell
npm run start-dev
```

4. Test your APIs

## Current available endpoints
- [x] `/categories`
- [ ] `/organizers`
- [ ] `/users`
- [ ] `/user-affiliates`
- [ ] `/events`
- [ ] `/event-categories`
- [ ] `/event-organizers`

> [!NOTE]
> This project is under development and may be abandoned at any moment.