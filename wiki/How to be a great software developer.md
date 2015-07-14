#### How to be a great software developer

Disclaimer: This is a very long piece, much longer than I would normally write on any subject. I have edited it back but on sending it to friends to read they agreed that there was no one bit that should be cut. I hope that you feel the same.

If there’s one thing that software developers care about, it’s becoming even better software developers. Where do you start though? Should you accumulate the bells and whistles: deepen your knowledge of Node and no-sequel? Should you rote-learn the answers to the profession’s gateway questions and be able to produce bubble sort or link shortener algorithms on demand? Or are there perhaps more fundamental roots that you can put down?

I believe that your seniority and value as a programmer is measured not in what you know, it’s measured in what you put out. The two are related but definitely not the same. Your value is in how you move your project forward and how you empower your team to do the same. In fifteen years of programming I’ve never had to implement a bubble sort or a link shortener. However I have had to spend thousands and thousands of hours writing and refactoring account management tools, editing suites, caching logic, mailing interfaces, test suites, deployment scripts, javascript layers, analytics architecture and documentation. These were the things that mattered, the completion of these were what moved us forward.

Those humble components are the bricks and mortar of projects and take hundreds or thousands of hours of hard work to assemble. And even though they combine to form complex systems, they themselves should not be complicated. You should aim for simplicity and over the years I have learned that simplicity is far more easily attained by time spent working and refactoring than hours of pure thought and “brilliance”.

Simplicity and excellence are most reliably attained by starting with something, anything, that gets the job done and reworking back from that point. We know this is true of companies and the concept of the MVP is burned deep into our consciousness. So too with software. Start with something ugly but functional and then apply and reapply yourself to that ugly and misshapen solution and refactor it back into its simplest form. Simplicity comes far more reliably from work than from brilliance. It comes more predictably from code written, than from thought expended. It comes from effort.


It is all too easy for smart lazy people to flash spikes of brilliance and wow their contemporaries but companies are not built on those people and product does not sit well on spikes. Companies are built on people and teams who day in, day out, commit good code that enables others do the same. Great product is built by work horses, not dressage horses.

Years after Joel coined the term “Rockstar Programmer”, it lives on along with the misapprehension that companies need such geeky micro-celebrities in order to do anything. While those characters do exist there aren’t many of them. When you do find them they’re often erratically brilliant - astonishing at the things that interest them but hopeless at working consistently or smoothly with their team.

Not only is their output erratic but their superiority is aspirational and infectious. Their arrogance bleeds toxically into the rest of the team. It signals loud and clear that if you’re smart enough you choose when you work and what you work on. You become a “Developer in Residence”. And you not only soak up a salary but you distort the values of those who work around you.

So the reality is that in all likelihood you and your team will depend, should depend not on those who think they are “Rockstars” or “Ninjas” but on reliable people who work in reliable ways.

Great developers are not people who can produce bubble sorts or link shorteners on demand. They are the people who when you harness them up to a project, never stop moving and inspire everyone around them to do the same. Fuck Rockstars. Hire workhorses. Here’s some ways to become one:

Name your functions and variables well (write Ronseal Code)

Such an incredibly simple place to start and yet I think it is one of THE most important skills in programming. Function naming is the manifestation of problem definition which is frankly the hardest part of programming.

Names are the boundary conditions on your code. Names are what you should be solving for.

If you name correctly and then solve for that boundary conditions that that name creates you will almost inevitably be left with highly functional code.

Consider the function:

1
2
3
def process_text string
  …
end
view rawprocess_text hosted with ❤ by GitHub
It tells someone almost nothing abo

ut what it’s going to do or how it’s been implemented in the code. However:
1
2
3
def safe_convert_to_html string
  ...
end
view rawsafe_convert_to_html hosted with ❤ by GitHub
tells someone exactly what’s going to happen. It’s also a good indicator as to what’s not going to happen. It tells you both what you can expect the method to do but also how far you can overload that method.

A developer might happily refactor “process_text” to not only convert text to HTML but to auto-embed videos. However that may be resolutely not what was expected in some of the places that function was used. Change it and you’ve created bugs. A good clear name is a commitment to not just what a function does but also what it won’t do.


A good function promises what it will deliver and then delivers it. Good function and variable naming makes code more readable and tightens the thousands of contracts which criss-cross your codebase. Sloppy naming means sloppy contracts, bugs, and even sloppier contracts built on top of them.

It’s not just functions that you can leverage to describe your code. Your variable names should also be strong. Sometimes it can even be worth creating a variable simply in order document the logic itself.

Consider the line:

1
2
3
4
if (u2.made < 10.minutes.ago)
   && !u2.tkn
   && (u2.made == u2.l_edit)
  ...
view rawgarbled if statement hosted with ❤ by GitHub
It’s pretty hard to figure out what the hell is happening there and even once you have done so, it’s not 100% clear what the original author was trying to achieve with it. The variable names are horrible and tell you nothing.

The “and not” statement is always confusing to read (please never write “and not” clauses which end with a noun) and if your job was to refactor this code you’d have to do some acrobatics to guess exactly what the original intent was.

However, if we change the variables names into something more meaningful then things immediately start to become clearer:

1
2
3
if (new_user.created_at < 10.minutes.ago)
  && !new_user.invitation_token
  && (new_user.created_at == new_user.updated_at)
view rawbetter if statement hosted with ❤ by GitHub
We can go further still and forcibly document the intent of each part of the if statement by separating and naming the components:

1
2
3
4
5
6
7
8
user_is_recently_created = user.created_at < 10.minutes.ago
invitation_is_unsent = !user.invitation_token
user_has_not_yet_edited_profile = (user.created_at == user.updated_at)

if user_is_recently_created
  && invitation_is_unsent
  && user_has_not_yet_edited_profile
  ...
view rawclearest if statement hosted with ❤ by GitHub
It takes some courage to write a line like “user_is_recently_created” because it’s such fuzzy logic but we all do it at times and owning up to that helps inform the reader about the assumptions you’ve made.

Notice also how much stronger this approach is than using comments. If you change the logic there is immediate pressure on you to change the variable names. Not so with comments. I agree with DHH, comments are dangerous and tend to rot - much better to write self-documenting code.

The better code describes itself, the more likely someone will implement it the way it was intended and the better their code will be. Remember, there are only two hard problems in computer science: cache invalidation, naming, and off-by-one errors.


Go deep before you go wide - learn your chosen stack inside out

Very few programming problems are genuinely new. Very few companies are doing technical work that hasn’t already been done by 50 teams before them. Very few problems attract Stack Overflow eyeballs that haven’t already seen them somewhere else before.

For that exact reason, the majority of the things you are trying to do have already been solved by the very stack you’re already using. I once refactored 60 lines of someone else’s Rails code to a one line using the delightfully simple and powerful methods that Rails ships with.


Not only do they waste time but they create verbosity and errors. Their code requires new documentation to describe it, new tests to monitor it and it makes the page noisier and harder to read. Like any new code, it’s also buggy. War-tested (and actually-tested) stack code is very seldom buggy.

If you are a Ruby developer take time to learn Ruby, especially the incredible range of array methods. If you are a Node developer take time to understand the architecture, the methods and the mindset of Node, if you are an Angular developer go right up to the rock-face and understand the logic behind of the incredible architecture the core team is forging there right now. Ask before you invent. You are walking in the shadows of giants. Take time to find their tracks and then marvel at how beautifully they have been built. Because if you don’t, you simply punt the problem downstream and someone will just have to figure out why the hell you chose the sub-standard path you did.

Learn to detect the smell of bad code

Something I’ve noticed in programmers who are good but who have plateaued is that they simply don’t realise that their code could be better. That is one of the worst things that can happen to your personal development. You need to know what has to improve before you can figure out how to improve it. Learn both what good code looks like and what bad code looks like. It is said that grand chessmasters spend proportionally much more time studying previous other good chess player’s games than the average players. I’m quite certain that the same is true for top developers.

An important part of your improvement arsenal is your ability to detect bad code - even when it’s only slightly bad or perhaps “a bit smelly”. Smelly code is code which, while you can’t quite articulate why, just doesn’t feel right.

It may be that you’ve used 60 lines of code for something which feels fundamentally simpler, it might be something which feels like it should be handled by the language but has been manually implemented instead, it might just be code that is as complicated as hell to read. These are your code smells.

It’s not an easy thing to do but over the years you should learn what bad code smells like and also what beautiful code looks like. You should develop an aesthetic appreciation for code. Physicists and mathematicians understand this. They feel very uneasy about an ugly theory based on its ugliness. Simplicity is beautiful and simplicity is what we want.

The truth is that the truth is sometimes ugly but you should always strive for beauty and when ugly is the only way, know how to present it well. If you can’t create beautiful code, at least create Shrek code but before you do either you need to develop your sense of smell. If you don’t know what good code looks like and know what bad code smells like then why would you ever improve it?

Write code to be read

I once heard Joel Spolsky say that Stack Exchange optimises not for the person asking questions but for the person reading the answers. Why? Because there are far more of them than the single person who asks the question - utility is maximised by optimising for readers, not questioners.

I think you can view code in a similar way. It will be written just once by you and you alone. However it will be read and edited many many times, by many others. Your code has two functions: the first is its immediate job. The second is to get out of the way of everyone who comes after you and it should therefore always be optimised for readability and resilience.


What assumptions have you made, what do your methods actually return, what on earth does that quadruple nested if / else / and not / unless, statement actually select for? Sometimes you’ll need more than just good variable naming and you should ring fence it with tests but do what it takes (and only just what it takes) to make it durable. Great code is code that does its job and that continues to do its job even when git blame returns a who’s who of your company payroll.

Write every line to be read through the eyes of a disinterested and time-pressured team mate needing to extend it in a year’s time. Remember that that disinterested and pressured team mate may be you.

Weigh features on their lifetime cost, not their implementation cost

New developers want to explore and to play. They love the latest shiniest things and whether they’re no-sequel databases or high concurrency mobile servers and they want to unwrap all the toys as fast as possible, run out of the room to play with them and leave the mess for the next dev to clear up.


Features and architecture choices have maintenance costs that affect everything you ever build on top of them. Abstractions leak and the deeper you bury badly insulated abstractions the more things will get stained or poisoned when they leak through.

Experimental architecture and shiny features should be embarked on very carefully and only for very good reasons. Build the features you need before the features you want and be VERY careful about architecture. Save toys for side projects. Every component you invent, every piece of bleeding edge, fast changing software you incorporate will bleed and break directly into your project. If you don’t want to spend the latter stages of the project doing nothing but mopping up blood then don’t use it in the first place.

Or, as a friend once tweeted


Understand the liability AND the leverage of Technical Debt

Technical debt is the code you write which, while sub-optimal, gets you to where you need to go. It’s the errors which, while annoying, are still sub-critical. It’s the complexity of a single-app architecture when you know that the future lies in service-orientation, it’s the twenty-minute cron job which could be refactored to twenty seconds.

The cost of these these not only adds up but it compounds. Einstein once said that “there is no force so powerful in the universe as compound interest”. Equally there is no force more destructive in a large software project as compounding technical debt. Most of us have seen (or built) these projects. Codebases where even the smallest change takes months of time. Codebases where people have lost the will to write good code and hope only to get in and get back out without bringing the site down.

Technical debt is an awful burden on a project.

Except when it’s not.
  
Not only that but technical debt is the best type of debt in the world because you don’t always have to pay it back. When you build out a feature that turns out to be wrong, when you build out a product which turns out not to work, you will drop it and move on. You will also drop every optimisation, every test and every refactoring you ever you wrote for that feature. So if you don’t absolutely need them; don’t write them. This is the time to maximise your leverage, leave gaps, ignore errors, test only what you need to test.

In the early stages of a product or a feature, the likelihood is that what you are building is wrong. You are in an exploratory phase. You will pivot both on product and on technical implementation. This is the time to borrow heavily on technical debt. This is not the time to fix those sporadic errors or to do massive refactorings. This is the time to run through with guns blazing and keep firing till you burst out the other side.

When that happens though; when you’re sure that you’re in the right place and out the other side then it’s time to tidy up and to strengthen your position. Get things in good enough shape to keep on rolling, repay enough of the debt to get you on to the next stage.

Technical debt is like so many other things in a startup, a game of leapfrog. Your initial code is scouting code. It should move you forward fast, illuminate the problem and the solution and give you just enough space to build camp. The longer you stay, the more of the system that camp has to support the bigger and stronger you build it. If you’re only ever staying for a week though, don’t burn time laying down infrastructure to support a decade.


Check and re-check your code. Your problems are yours to fix

Engineers who “throw code over the fence” are awful engineers. You should make sure your code works. It’s not the testers’ job and it’s not your team-mates’ job. It’s your job. Lazily written code slows you down, increases cycle times, releases bugs and pisses everyone off.  
Don’t kid yourself that you’re anything less than a burden and get it fixed.

Do actual work for at least (only) four hours every day

For all the talk about self optimisation, focus and life hacking that goes on amongst developers, the simple truth is that you don’t need to do that much work to be effective. What really matters is that you do it consistently. Do proper work for at least four solid hours each day, every day and you will be one the best contributing members of your team.

However, doing four hours of work every day is harder than it seems.

Proper work is work that includes no email, no Hacker News, no meetings, no dicking around. It means staying focussed for at least 45 minutes at a time. Four hours of work a day means that one day lost in meetings or on long lunches and foosball breaks means you have do eight hours the next one. Believe you me, eight hours of solid work is almost impossible. Four hours a day on average also means you should be aiming for five or six in order to prep for the day when you only get two.

However it also means you can be a huge contributor to your team while still having a fully rounded life. It means that you don’t need to post that self-indulgent “I’m burning out, please help me” post on HN. It means that simply by being consistent you can be valued and respected.

Software teams don’t slow down because people work four pure hours a day rather than seven (which is insanely hard to do consistently by the way). They slow down because people spend weeks with no direction, or because the louder and emptier vessels dedicate their paid time to discussing Google v. Facebook’s acquisition strategies over endless extended coffee breaks.  
Just work. Doesn’t matter how incremental or banal your progress seems…


Write up the things you’ve done and share them with the team

However you document things, whether it’s through a mailing list like Copyin, a wiki or even just inline documentation in the code, you should take the time to explain your architectural approach and learnings to the rest of the team.

Have a tough time getting a fresh install of Postgres or ImageMagik to work? If you found it hard, the rest of your team will probably also find it hard so take a moment to throw down a few paragraphs telling them what you did and saving them your hassles.

One of the worst parts of programming is losing whole days to battling bugs or installation issues. If you take the time to document and distribute the way you found through that you could buy five times your wasted time back by forearming your colleagues.

Understand and appreciate the exquisite balance between too much testing and too little

Testing is a powerful tool. It allows you to set a baseline for the reliability of your releases and makes you less fearful to make them. The less fearful you are to release, the more you do so and the faster you improve.

However it’s also an overhead. Tests take time to write, time to run and even more time to maintain.


You become too heavy to move, too encumbered to flex your limbs, immobile. Too little of it and the first skid across a concrete floor is going to cut you open and leave you bleeding.  
There is no intuitive answer to what the right amount of testing is. Some projects require more testing than others and testing is a whole new piece of expertise you need to learn in and of itself.

Take the time to understand what really needs tests and how to write good tests. Take the time to see when tests add value and what the least you need from them really is. Don’t be afraid to test but don’t be afraid not to test either. The right point is a balance; take time to explore where the equilibrium lies.

Make your team better

This is different to the other points in that it’s not something you can action so much as an indicator of whether your other actions are working.

Does your presence make your team better or worse? Does the quality of your code, your documentation and your technical skills help and improve those around you? Do you inspire and encourage your team-mates to become better developers? Or are you the one that causes the bugs, argues during stand-ups and who wastes hours of time discussing irrelevant architectural nuances because it helps cover the fact that you’ve done no actual work?

You should make your team better. There should always be at least one or two ways in which you make those people around you better and through which you help strengthen them. However, be aware that being “smart” alone is probably the least valuable and arguably most destructive dimension you can choose. In fact, if your chosen dimension doesn’t actually make you tired it’s probably not a valid one.

It’s not who you are on the inside that defines you

There is one, humbly brilliant line in Batman Begins which has always stayed with me. At some point in the film where he’s fooling around and acting up as a billionaire playboy, Christian Bale implores Katie Holmes to believe that he’s still a great guy on the inside. She answers simply: “it’s not who you are underneath, it’s what you do that defines you”.

Your contribution as a developer is defined not by the abstraction of how smart you are or how much you know. It’s not defined by the acronyms on your resume, the companies you’ve worked at or which college you went to. They hint at what you’re capable of but who you are is defined by what you do and how that changes the project and the people around you.

If you want to be good, apply yourself.