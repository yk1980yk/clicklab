/* ===========================================================
   検体の英語版。no をキーに、日本語版へ上書きする。
   mock は class と data-trap / data-label の構造を日本語版と揃えること。
   =========================================================== */
window.STAGES_EN = {

1: {
  title: 'The one-day-only countdown',
  category: 'Urgency',
  url: 'ai-coding-master.example/lp',
  mock: `
    <div class="m-sale">
      <div class="m-sale__banner" data-trap="dark" data-label="A discount with no basis">
        <span class="m-sale__badge">TODAY ONLY</span>
        The Complete AI Coding Masterclass
        <span class="m-sale__price"><s>$500</s> → <b>$9</b></span>
      </div>
      <div class="m-sale__timer" data-trap="dark" data-label="Resets on reload">
        <span class="m-sale__timerLabel">Offer ends in</span>
        <span class="m-sale__clock" data-clock>00:04:59</span>
      </div>
      <div class="m-sale__stock" data-trap="dark" data-label="Fixed stock and viewer count">
        Only <b>1</b> seat left
        <span class="m-sale__viewers"><b data-viewers>14</b> people viewing this page right now</span>
      </div>
      <button class="m-sale__cta">Claim the last seat at this price</button>
      <p class="m-sale__note">* One purchase per customer.</p>
    </div>`,
  question: 'The countdown is under a minute and the page says one seat is left. What do you do?',
  choices: [
    { text: 'Buy now, before the offer disappears',
      feedback: 'This is what most people do. Urgency has skipped the part where you decide whether you want it.' },
    { text: 'Open a new tab and look up the company behind the offer',
      feedback: 'The strongest move. Simply leaving the page drains most of the urgency out of the decision.' },
    { text: 'Reload the page and see what happens',
      feedback: 'A cheap test that settles the question on the spot — though it tells you nothing about who is selling.' }
  ],
  patternName: 'Fake urgency / Fake scarcity',
  psychology: 'Fear of missing out',
  explanation:
    'When people feel they will lose out by waiting, the slower, deliberate part of thinking gets crowded out. Most of these timers and “1 left” labels are not connected to any inventory — they start from the same number every time the page loads. Viewer counts are often just a random number ticking over.',
  checks: [
    'Reload. If the timer returns to its starting number, it is almost certainly fake',
    'Open the page in a private window or another browser and see whether it starts from the same place',
    'When a page rushes you, that is the moment to close it and search for reviews'
  ],
  demo: {
    label: 'Reload this specimen',
    result: 'The timer is back at 00:04:59 and the viewer count is 14 again. That number was never tracking stock on a server — it starts running the moment the page opens.'
  }
},

2: {
  title: 'The free trial sign-up',
  category: 'Subscriptions',
  url: 'studyflow.example/trial',
  mock: `
    <div class="m-trial">
      <h3 class="m-trial__h">Unlimited Learning</h3>
      <p class="m-trial__lead">3,000 courses. Start free.</p>
      <button class="m-trial__cta" data-trap="dark" data-label="Only the entrance is loud">Try free for 1 month</button>
      <p class="m-trial__sub">Credit card required</p>
      <p class="m-trial__fine" data-trap="dark" data-label="The exit is folded in here">* At the end of the trial your account converts automatically to the paid plan at $79/month. Cancellations are accepted by telephone only, no later than 10 days before your renewal date, weekdays 10:00–11:00. We do not process cancellations by post or online.</p>
    </div>`,
  question: 'You are about to press “Try free for 1 month”. What do you do next?',
  choices: [
    { text: 'Press the button and sign up',
      feedback: 'Your eye locks onto the word “free” and the huge button, and the conditions underneath go unread. The contract still forms.' },
    { text: 'Read the small text under the button',
      feedback: 'The right move. That is where the price after conversion and the cancellation terms were sitting.' },
    { text: 'Find out how to cancel before signing up at all',
      feedback: 'The strongest defence. Checking the exit before you use the entrance works on every recurring charge.' }
  ],
  patternName: 'Hidden subscription / Hard to cancel',
  psychology: 'Selective attention — a strong visual element pulls the eye and everything near it disappears',
  explanation:
    'One click to enter; a one-hour weekday phone window to leave. The effort on either side is deliberately lopsided. Because a bright element captures attention, the small grey text directly beneath it is almost never read. It is small in order not to be read, not written to be readable. This shape was once nicknamed the Roach Motel, after a trap that insects can enter but not leave; the current name is Hard to cancel.',
  checks: [
    'Always read the small print directly under a big “free” button, and at the foot of the page',
    'Search for “cancel” before signing up and check whether it can be done online',
    'If cancellation is by phone only, in a narrow window, not signing up is a reasonable choice'
  ]
},

3: {
  title: 'The final total',
  category: 'Pricing',
  url: 'skyhop-travel.example/booking/confirm',
  mock: `
    <div class="m-price">
      <div class="m-price__hero" data-trap="dark" data-label="The price you were shown first">Domestic flights from <b>$49</b></div>
      <div class="m-price__step">Step 4 of 4 — Review your payment</div>
      <table class="m-price__table">
        <tr><td>Fare</td><td>$49.00</td></tr>
        <tr data-trap="dark" data-label="Added later"><td>Service fee</td><td>$19.00</td></tr>
        <tr data-trap="dark" data-label="Possibly removable"><td>Seat selection</td><td>$14.00</td></tr>
        <tr data-trap="dark" data-label="Possibly removable"><td>Ticketing fee</td><td>$11.00</td></tr>
        <tr class="m-price__total"><td>Total due</td><td>$93.00</td></tr>
      </table>
      <button class="m-price__cta">Confirm and pay</button>
    </div>`,
  question: 'You started at $49 and the final screen says $93. What do you do?',
  choices: [
    { text: 'Pay it — you have already spent ten minutes filling in forms',
      feedback: 'Time already spent is bending the decision. The ten minutes and the extra $44 have nothing to do with each other.' },
    { text: 'Uncheck the added options, look at the breakdown, and reconsider',
      feedback: 'Correct. Seat selection is often removable, and if it is not, you can now compare this as a $93 flight.' },
    { text: 'Accept it — every airline ends up at roughly this number',
      feedback: 'Some sellers do show the full price upfront. Making you believe everyone does this is itself part of the effect.' }
  ],
  patternName: 'Hidden costs',
  psychology: 'Sunk cost — reluctance to abandon something you have already put effort into',
  explanation:
    'A low number gets the process started, and the charges appear at the end, once turning back feels expensive. Almost nobody walks away after entering their personal details. A “from $49” headline only needs one seat at that price to be technically true.',
  checks: [
    'Read “from $X” as the price of a single seat under the best possible conditions',
    'Always open the breakdown on the payment screen',
    'Compare final totals against each other, never headline prices'
  ]
},

4: {
  title: 'One click from confirming',
  category: 'Defaults',
  url: 'bookdrop.example/cart/checkout',
  mock: `
    <div class="m-cart">
      <div class="m-cart__item">
        <span>Ebook — “Getting Started with UX Research”</span><b>$18.00</b>
      </div>
      <label class="m-cart__opt" data-trap="dark" data-label="Ticked before you arrived">
        <input type="checkbox" checked>
        <span>Protection Plan ($5/month, first month free)</span>
      </label>
      <label class="m-cart__opt" data-trap="dark" data-label="Ticked before you arrived">
        <input type="checkbox" checked>
        <span>Send me offers and updates by email</span>
      </label>
      <div class="m-cart__sum">Total today <b>$18.00</b><span class="m-cart__sumNote">(Protection Plan billed from next month)</span></div>
      <button class="m-cart__cta">Place your order</button>
    </div>`,
  question: 'Before you press “Place your order”, what should you check?',
  choices: [
    { text: 'Just that the total is right',
      feedback: 'The total is still $18.00. A charge that starts next month never appears in today\u2019s figure.' },
    { text: 'Whether anything has been ticked for you',
      feedback: 'Correct. Both boxes were already ticked, and leaving them counts as agreement.' },
    { text: 'Nothing — you can unsubscribe from the emails later',
      feedback: 'True of the email alone. But a recurring charge was sitting in the same row.' }
  ],
  patternName: 'Preselection / Sneaking',
  psychology: 'Default effect — people leave the initial state as they found it',
  explanation:
    'People read a default as a recommendation and move on. The heart of this pattern is that no decision was made, yet a record of consent exists. Keeping today\u2019s total unchanged is what lets it slip past the check.',
  checks: [
    'Treat any pre-ticked box as something to question',
    'Look past the total for charges that begin later',
    'Know that the area around a confirm button is where things get placed deliberately'
  ]
},

5: {
  title: 'Choosing a plan',
  category: 'Visual',
  url: 'lumipic.example/signup/plan',
  mock: `
    <div class="m-plan">
      <h3 class="m-plan__h">Choose your plan</h3>
      <button class="m-plan__paid" data-trap="dark" data-label="Only one side is made visible">
        Go Premium
        <span class="m-plan__paidSub">$12/month / no ads</span>
      </button>
      <div class="m-plan__row">
        <span class="m-plan__ghost" data-trap="dark" data-label="The exit, blended into the page">Continue with the free plan</span>
      </div>
    </div>`,
  question: 'You want to keep using the free version. What do you press?',
  choices: [
    { text: 'The large, prominent button',
      feedback: 'It said “Go Premium”. Judging direction by colour and size alone leads exactly here.' },
    { text: 'The faint grey text near the bottom',
      feedback: 'Correct. The option you wanted was the one made hardest to see.' },
    { text: 'Go back and look for a page about the free plan',
      feedback: 'Cautious, but the free option is already on this screen — just buried.' }
  ],
  patternName: 'Visual interference',
  psychology: 'People decide which way is forward from shape and colour before they read anything',
  explanation:
    'Visual weight is normally a cue about importance. Assign that weight to whatever suits the company and people misfire. Nothing here is untrue, and plenty of people still press the option they did not want.',
  checks: [
    'Read the words on a button before pressing it, not its colour',
    'If two things look like the way forward, check what each one actually does',
    'Scan the edges of the screen for options that have been made quiet'
  ]
},

6: {
  title: 'Holding a seat',
  category: 'Judging legitimacy',
  url: 'ticket-gate.example/seat/hold',
  mock: `
    <div class="m-hold">
      <div class="m-hold__seat" data-trap="clear" data-label="A real seat is being held">
        Seats held for you &nbsp;<b>Stalls, Row J, 12–13</b>
      </div>
      <div class="m-hold__timer" data-trap="clear" data-label="Counted on the server">
        Complete payment within <span class="m-hold__clock" data-clock>10:00</span>
      </div>
      <p class="m-hold__note">If payment is not completed in time, the hold is released automatically and the seats return to general sale.</p>
      <button class="m-hold__cta">Continue to payment</button>
    </div>`,
  question: 'Is this timer a deceptive pattern?',
  choices: [
    { text: 'Yes — it is rushing you into buying',
      feedback: 'Suspicion is healthy, but this is not staged pressure. Distrusting everything is not the same as seeing clearly.' },
    { text: 'No — it is a legitimate hold that protects other buyers',
      feedback: 'Correct. Real seats are being held, and the clock exists to release them.' },
    { text: 'Reload the page and the timer will stop',
      feedback: 'It will not — the count lives on the server. Acting twice may even release the hold.' }
  ],
  patternName: 'Legitimate session management',
  psychology: 'The same time limit can protect very different things',
  explanation:
    'The timer in specimen 1 held nothing and existed only to hurry you. This one is attached to seats that are genuinely reserved, and the limit exists so other buyers get a fair chance. The decisive difference: reloading does not reset it, because the count is kept on the server.',
  checks: [
    'If a reload does not reset the clock, it is being counted server-side',
    'Look for an explanation of what the limit is protecting',
    'If what you lose at zero is concrete — these seats — something real is probably behind it'
  ],
  demo: {
    label: 'Reload this specimen',
    result: 'The timer did not reset. The remaining time is counted on the server, so reopening the page picks up where it left off. That is the decisive difference from specimen 1.'
  }
},

7: {
  title: 'Turning down a coupon',
  category: 'Emotion',
  url: 'modeclip.example/campaign',
  mock: `
    <div class="m-shame">
      <div class="m-shame__card">
        <p class="m-shame__h">$10 off your first order</p>
        <button class="m-shame__yes">Yes, take $10 off my order</button>
        <p class="m-shame__no" data-trap="dark" data-label="Shame attached to declining">No thanks, I enjoy paying full price and wasting money</p>
      </div>
    </div>`,
  question: 'How do you read this, and what do you do?',
  choices: [
    { text: 'Nobody likes losing money — use the coupon and buy',
      feedback: 'A purchase made to avoid a bad feeling. Whether you need the product never entered into it.' },
    { text: 'Recognise the nudge for what it is and decline if you do not want it',
      feedback: 'Correct. The feeling attached to the button has been separated from the decision.' },
    { text: 'Feel a bit foolish about turning it down',
      feedback: 'That feeling is the designed output. Declining is not foolish.' }
  ],
  patternName: 'Confirmshaming',
  psychology: 'People avoid options that make them feel bad about themselves',
  explanation:
    'The act of declining is fused to a statement about your own poor judgement. To say no, you must first agree that you are careless with money. The price tag is emotional and it is attached to the button, not to the product.',
  checks: [
    'Emotive wording on a decline button is staging, not information',
    'Return to the only question that matters: do you want the thing',
    'If declining feels awkward, notice that the awkwardness was manufactured'
  ]
},

8: {
  title: 'Far below the going rate',
  category: 'Credibility',
  url: 'marketnest.example/item/8842190',
  mock: `
    <div class="m-bait">
      <div class="m-bait__title">[New / Sealed] Next-Gen Games Console</div>
      <div class="m-bait__price" data-trap="dark" data-label="The number that takes your attention">Special price <b>$149</b> <s>RRP $499</s></div>
      <div class="m-bait__img">Product photo (console)</div>
      <div class="m-bait__spec">
        <p>· Ships immediately</p>
        <p>· Free delivery</p>
        <p class="m-bait__hidden" data-trap="dark" data-label="What you are actually buying">* This listing is for a moulded plastic storage case shaped like the console. The console itself is not included.</p>
      </div>
      <button class="m-bait__cta">Add to basket</button>
    </div>`,
  question: 'You find something far below the going rate. What do you check first?',
  choices: [
    { text: 'Buy immediately — it will sell out',
      feedback: 'The price takes your attention and the line at the bottom of the description goes unread.' },
    { text: 'Read the full description and any notes, to the end',
      feedback: 'Correct. This listing stated that the console itself was not included.' },
    { text: 'Trust it — the photo looks genuine',
      feedback: 'The photo was of the console. Nothing guarantees the photo matches what ships.' }
  ],
  patternName: 'Trick wording',
  psychology: 'Anchoring — the first number becomes the reference point and scrutiny drops',
  explanation:
    'An impossible price captures all the attention, and the details stop being checked. The note is not a lie; it has simply been placed where nobody reads. That is precisely what lets the seller say it was disclosed. Luring buyers with one thing and handing them another is close to what is generally called bait and switch.',
  checks: [
    'A price far off the market has a reason behind it',
    'Read product descriptions to the end, especially lines beginning with an asterisk',
    'Check the specification for what is included, not the photograph'
  ]
},

9: {
  title: 'The road out',
  category: 'Subscriptions',
  url: 'flowbox.example/account/cancel',
  mock: `
    <div class="m-maze" data-trap="dark" data-label="Friction added to the exit">
      <div class="m-maze__bar"><span data-maze-step>1</span> / 5</div>
      <div class="m-maze__body" data-maze-body>
        <p class="m-maze__h">Are you sure you want to cancel?</p>
        <p class="m-maze__t">You will lose access to the 128 files you have saved.</p>
      </div>
      <div class="m-maze__btns">
        <button class="m-maze__stay">Keep my plan</button>
        <button class="m-maze__go" data-maze-next>Continue cancelling</button>
      </div>
    </div>`,
  mazeSteps: [
    { h: 'Are you sure you want to cancel?', t: 'You will lose access to the 128 files you have saved.' },
    { h: 'Help us improve', t: 'Tell us why you are leaving. Takes about 5 minutes.' },
    { h: 'A special offer for you', t: 'Stay and get 50% off for the next three months.' },
    { h: 'Look at what you have been using', t: 'You opened this 12 times last month. Are you certain?' },
    { h: 'Final confirmation', t: 'Press the button once more to confirm cancellation.' }
  ],
  question: 'You keep hitting retention screens while cancelling. What is the right response?',
  choices: [
    { text: 'Give up for now and try again next month',
      feedback: 'That is the design working. The same screens will be waiting, and the charges continue in the meantime.' },
    { text: 'Keep choosing “continue” until you reach a completion screen',
      feedback: 'Correct. Nothing is cancelled until you have both the completion screen and the confirmation email.' },
    { text: 'Close the tab — it will cancel automatically',
      feedback: 'An abandoned process is void. The subscription continues to the next billing date.' }
  ],
  patternName: 'Obstruction / Hard to cancel',
  psychology: 'Decision fatigue — every extra step increases the chance of giving up',
  explanation:
    'Each screen has a respectable name: a confirmation, a survey, an offer. None of them looks wrong on its own. Stacking five of them is the point. The asymmetry itself — one click to join, five screens to leave — is the method.',
  checks: [
    'Do not close the tab until you see a completion screen',
    'Confirm the cancellation email arrived, and keep a screenshot',
    'Check your billing date and verify next month that the charge stopped'
  ]
},

10: {
  title: 'Two rooms left',
  category: 'Judging legitimacy',
  url: 'stayfinder.example/hotel/lisbon-1024',
  mock: `
    <div class="m-stay">
      <div class="m-stay__name">Hotel Alfama View — Lisbon</div>
      <div class="m-stay__room">
        <span>Standard Twin (non-smoking, 24m²)</span>
        <span class="m-stay__left" data-trap="clear" data-label="Tied to real inventory">2 rooms left</span>
      </div>
      <div class="m-stay__row">Sat 12 Oct · 1 night · 2 guests &nbsp;<b>$184</b></div>
      <div class="m-stay__cal" data-trap="clear" data-label="Other dates show different numbers">
        <span>11 Oct — available</span><span>12 Oct — 2 left</span><span>13 Oct — sold out</span>
      </div>
      <button class="m-stay__cta">Book this room</button>
    </div>`,
  question: 'Is “2 rooms left” a deceptive pattern here?',
  choices: [
    { text: 'Yes — “only 2 left” is designed to make you anxious',
      feedback: 'The wording resembles the fake version, but this one reports real inventory. Judging by phrasing alone gets it wrong.' },
    { text: 'No — it reports real availability',
      feedback: 'Correct. Other dates show different numbers, and other booking sites agree.' },
    { text: 'Every “only X left” on a booking site is a lie',
      feedback: 'Treat them all as lies and you will lose the room on the night there genuinely are two.' }
  ],
  patternName: 'Genuine availability',
  psychology: 'The same wording means different things depending on what sits behind the number',
  explanation:
    'The “1 left” in specimen 1 was a fixed label unconnected to stock. This number changes when you change the date, and matches what other sites report. The test is not the wording — it is what the number is connected to.',
  checks: [
    'Change the dates or the party size and see whether the number changes',
    'Cross-check against another booking site or the hotel directly',
    'Be suspicious only when stock falls implausibly fast'
  ]
},

11: {
  title: 'A quiz app wants your contacts',
  category: 'Privacy',
  url: 'app: Personality Decoder',
  mock: `
    <div class="m-perm">
      <div class="m-perm__app">Personality Decoder</div>
      <div class="m-perm__dialog" data-trap="dark" data-label="Unrelated to the feature">
        <p class="m-perm__t">Allow access to your contacts so you can share your results with friends</p>
        <div class="m-perm__btns">
          <span class="m-perm__deny" data-trap="dark" data-label="Reappears after every refusal">Don't allow</span>
          <span class="m-perm__allow">Allow</span>
        </div>
      </div>
    </div>`,
  question: 'A personality quiz asks for your contacts. What do you do?',
  choices: [
    { text: 'Allow it — the app probably needs it',
      feedback: 'Showing you a quiz result needs no contacts. The sentence merely makes it sound necessary.' },
    { text: 'Refuse, and delete the app if it keeps asking',
      feedback: 'Correct. Repeated asking after a refusal is itself evidence that collection is the goal.' },
    { text: 'Allow it — contact data is harmless',
      feedback: 'You are not only handing over your own information. Everyone in your address book comes with it.' }
  ],
  patternName: 'Forced action / Nagging',
  psychology: 'Substituted purpose — your wish to use the app is used to extract something unrelated',
  explanation:
    '"So you can share with friends" is not a reason to read your address book; sharing needs a link. Asking again after a refusal is designed to catch you on a tired press. The information does not belong only to you, which is what makes it different from most permissions.',
  checks: [
    'Ask whether the feature genuinely requires that permission — a calculator does not need your location',
    'An app that keeps asking after a refusal is collecting for its own sake',
    'Treat contacts, photos and location as things you cannot take back once given'
  ]
},

12: {
  title: 'Ranked number one',
  category: 'Credibility',
  url: 'glowcare.example/product/serum',
  mock: `
    <div class="m-proof">
      <div class="m-proof__badges" data-trap="dark" data-label="No source given">
        <span>99.8% satisfaction</span><span>#1 Ranked</span><span>As featured in</span>
      </div>
      <div class="m-proof__name">GlowCare Moisture Serum</div>
      <div class="m-proof__stars">★★★★★ 4.9 (1,284 reviews)</div>
      <div class="m-proof__reviews" data-trap="dark" data-label="All posted the same day">
        <p>Saw a difference in three days! <span>2026/08/12</span></p>
        <p>Can't live without it now. Told all my friends <span>2026/08/12</span></p>
        <p>Better than I expected. Definitely reordering <span>2026/08/12</span></p>
      </div>
      <button class="m-proof__cta">Buy now</button>
    </div>`,
  question: 'How should you read these badges and ratings?',
  choices: [
    { text: 'They are printed large, so the product must be well regarded',
      feedback: 'The size of a claim has nothing to do with the strength of its evidence.' },
    { text: 'With no survey body or date given, treat them as self-declared',
      feedback: 'Correct. The clustering of review dates on a single day is a second signal.' },
    { text: 'Nobody could print “#1” if it were untrue',
      feedback: 'Unsubstantiated superiority claims are regulated in most markets, but enforcement comes after the fact and vague badges remain common.' }
  ],
  patternName: 'Fake social proof',
  psychology: 'Bandwagon effect — what many people endorse feels true without checking',
  explanation:
    '"Number one" can be manufactured by choosing your own category, period and sample. Regulators in many countries treat unsupported superiority claims as unlawful, but the existence of a rule is not the same as the claim being true. A figure with no source is a figure whose source was left out.',
  checks: [
    'Look for the survey body, sample size and dates near any number or badge',
    'Check whether reviews cluster on particular days',
    'Be wary when a run of reviews shares the same rhythm and vocabulary'
  ]
},

13: {
  title: 'An honest review',
  category: 'Credibility',
  url: 'dailynote.example/review/serum',
  mock: `
    <div class="m-stealth">
      <div class="m-stealth__meta">Daily Note / 28 Aug 2026</div>
      <h4 class="m-stealth__h" data-trap="dark" data-label="Dressed as a third party">I used the serum everyone is talking about for three months. Here is the honest verdict</h4>
      <p class="m-stealth__lead">Hi, I'm Sarah. I bought this with my own money, so this is not sponsored...</p>
      <p class="m-stealth__body">Honestly I had low expectations, but somewhere past the first month the difference became obvious. I would not go back now.</p>
      <a class="m-stealth__cta" data-trap="dark" data-label="No ad disclosure anywhere">See it on the official site →</a>
      <div class="m-stealth__foot">Filed under: Skincare &nbsp;|&nbsp; Share this post</div>
    </div>`,
  question: 'You are about to buy based on this review. What do you do first?',
  choices: [
    { text: 'Trust it — this is someone who actually used the product',
      feedback: 'The moment you read it as a stranger\u2019s opinion, your guard drops. That is the purpose of the format.' },
    { text: 'Check the whole page for an ad, sponsored or paid-partnership disclosure',
      feedback: 'Correct. If none exists, you can reread the piece assuming it is advertising.' },
    { text: 'Assume a personal blog is not corporate advertising',
      feedback: 'Anyone can build something that looks like a blog. The format tells you nothing.' }
  ],
  patternName: 'Disguised ads',
  psychology: 'Advertising gets discounted; a stranger\u2019s opinion does not',
  explanation:
    'If people know something is an ad, they read it expecting the good parts only. Dressing it as a personal post removes that discount. Many jurisdictions now treat undisclosed advertising as unlawful — Japan brought this in from October 2023, and notably it is the advertiser, not the person who posted, who is penalised.',
  checks: [
    'Look for “ad”, “sponsored”, “paid partnership” or “gifted” at the top and bottom',
    'Check whether the product link carries affiliate parameters',
    'Search for other glowing pieces about the same product from the same period'
  ]
},

14: {
  title: 'Buying with game currency',
  category: 'Pricing',
  url: 'app: Starling Saga',
  mock: `
    <div class="m-coin">
      <div class="m-coin__bar">Balance <b>3,000</b> G</div>
      <div class="m-coin__item">
        <div class="m-coin__thumb">Limited skin</div>
        <div class="m-coin__info">
          <p class="m-coin__name">Mantle of Stars (limited time)</p>
          <p class="m-coin__price" data-trap="dark" data-label="Not a currency you know">1,200 G</p>
        </div>
      </div>
      <button class="m-coin__cta">Purchase</button>
      <p class="m-coin__rate" data-trap="dark" data-label="The rate appears only here">* G is a paid currency. 1,000 G = $12.00. G cannot be purchased in amounts smaller than 1,000.</p>
    </div>`,
  question: 'This item costs 1,200 G. What are you actually paying?',
  choices: [
    { text: 'About $12',
      feedback: 'If 1 G felt like one cent, the display did its job. The real figure is $14.40.' },
    { text: 'Convert it to real money before deciding',
      feedback: 'Correct. 1,200 G is $14.40 — and since G only sells in blocks of 1,000, you will be left holding a remainder.' },
    { text: 'Nothing — it is in-game currency',
      feedback: 'The screen states it is a paid currency. You are spending money you already converted.' }
  ],
  patternName: 'Currency Confusion',
  psychology: 'Put one unit between people and money and the sting of spending fades',
  explanation:
    '1,200 G is $14.40, but the unit alone dulls the sense of the amount. Because G only sells in blocks of 1,000, every purchase leaves an unusable remainder — and spending that remainder requires buying more. The leftover is the design.',
  checks: [
    'Convert to real money before every purchase',
    'Compare the unit price of each currency pack; if bulk is cheaper, small packs are overpriced',
    'Notice whether the pricing guarantees an awkward leftover balance'
  ]
},

15: {
  title: 'Three plans, three prices',
  category: 'Pricing',
  url: 'workflow-hub.example/pricing',
  mock: `
    <div class="m-cmp">
      <div class="m-cmp__col">
        <p class="m-cmp__n">Lite</p>
        <p class="m-cmp__p" data-trap="dark" data-label="Units do not match"><b>$0.33</b>per day</p>
        <p class="m-cmp__f">· Core features<br>· Email support</p>
      </div>
      <div class="m-cmp__col is-rec">
        <p class="m-cmp__n">Standard</p>
        <p class="m-cmp__p"><b>$14.80</b>per month</p>
        <p class="m-cmp__f" data-trap="dark" data-label="Feature names do not line up">· Enhanced support<br>· Advanced insights</p>
      </div>
      <div class="m-cmp__col">
        <p class="m-cmp__n">Pro</p>
        <p class="m-cmp__p"><b>$148</b>per year</p>
        <p class="m-cmp__f">· Everything included<br>· Priority handling</p>
      </div>
    </div>`,
  question: 'You want to know which plan is cheapest. What do you do?',
  choices: [
    { text: 'Pick Lite — $0.33 a day is the smallest number',
      feedback: '$0.33 a day is about $10 a month; $148 a year is about $12.30 a month. The order is not what it looks like.' },
    { text: 'Convert everything to the same period, then compare',
      feedback: 'Correct. Lined up monthly: Lite ~$10, Standard $14.80, Pro ~$12.30. The middle one is the most expensive.' },
    { text: 'Take the middle one — it is usually the safe choice',
      feedback: 'Three columns make the middle the default choice, which is why the priciest option is placed there.' }
  ],
  patternName: 'Comparison prevention',
  psychology: 'When units do not match, people stop calculating and decide on impression',
  explanation:
    'Nothing is false. Simply leaving the units unaligned makes comparison expensive, and once it feels like work people default to whatever is visually prominent. The feature lists use different vocabulary for each tier, so what you actually gain by upgrading stays unclear.',
  checks: [
    'Convert every price to the same period before comparing',
    'Check whether the feature lists use consistent wording across tiers',
    'Remember the comparison table was written by the seller'
  ]
},

16: {
  title: 'The last cancellation screen',
  category: 'Subscriptions',
  url: 'flowbox.example/account/cancel/done',
  mock: `
    <div class="m-fakedone">
      <div class="m-fakedone__mark">✓</div>
      <p class="m-fakedone__h" data-trap="dark" data-label="Says done when it is not">Your cancellation is complete</p>
      <p class="m-fakedone__sub">Thank you for being with us.</p>
      <p class="m-fakedone__fine" data-trap="dark" data-label="The real condition, here">* Your cancellation is not yet complete. It will be finalised once you have answered the survey below.</p>
      <button class="m-fakedone__cta">Continue to the survey</button>
    </div>`,
  question: 'This screen appears. What do you do?',
  choices: [
    { text: 'It says complete — close the tab',
      feedback: 'Nothing was cancelled and next month\u2019s charge will arrive. Getting you to close the tab reassured is the point.' },
    { text: 'Check for conditions under the completion message and finish the process',
      feedback: 'Correct. The true state was in the small text, not the large one.' },
    { text: 'Start the cancellation over from the beginning, to be safe',
      feedback: 'Careful, but it loops back here. Reading the note is faster.' }
  ],
  patternName: 'Trick wording / Hard to cancel',
  psychology: 'People read large text as the conclusion and skim small text as decoration',
  explanation:
    'Saying “complete” when nothing is complete sits at the harsher end of the range. The user closes the tab reassured and the billing continues. Obstructing cancellation is an enforcement target in several jurisdictions, and misleading confirmation screens are among the clearest examples.',
  checks: [
    'When you see “complete”, check for a note beneath it',
    'Confirm a cancellation email arrived and save the screen',
    'Verify next month that the charge actually stopped'
  ]
},

17: {
  title: 'Your streak is about to break',
  category: 'Attention',
  url: 'app: Daily Leaf',
  mock: `
    <div class="m-streak">
      <div class="m-streak__flame" data-trap="dark" data-label="Your effort held hostage">
        <span class="m-streak__num">7</span>
        <span class="m-streak__lab">day streak</span>
      </div>
      <p class="m-streak__warn" data-trap="dark" data-label="Framed as a loss">Your streak ends in <b>2h 14m</b></p>
      <div class="m-streak__feed" data-trap="dark" data-label="A list with no end">
        <p>Suggested for you</p><p>Suggested for you</p><p>Suggested for you</p>
        <p class="m-streak__more">Loading…</p>
      </div>
    </div>`,
  question: 'The app says your streak is about to break. What do you do?',
  choices: [
    { text: 'Open it and keep the streak alive',
      feedback: 'That number is not a goal you set. It was chosen by the company.' },
    { text: 'Separate their metric from your own reason for using the app',
      feedback: 'Correct. Go back to what you opened it for and a broken streak costs you nothing.' },
    { text: 'Turn off notifications and open it only when you want to',
      feedback: 'A real improvement — though the same screen waits when you do open it, so the separation still matters.' }
  ],
  patternName: 'Addictive Design',
  psychology: 'Loss aversion — losing something you have built hurts more than gaining it pleased',
  explanation:
    'Streaks, expiring rewards, feeds without an end. All of them exist to remove the moment where stopping feels natural. What is being spent here is time rather than money, so it is rarely experienced as a cost, and the longer the streak runs the harder it becomes to drop.',
  checks: [
    'Treat the streak as the company\u2019s metric, not your goal',
    'Look for a view with an end to it — a list, or pages',
    'Turn off notifications and autoplay'
  ]
},

18: {
  title: 'Twelve dollars a month',
  category: 'Subscriptions',
  url: 'moviegate.example/join',
  mock: `
    <div class="m-lock">
      <p class="m-lock__h" data-trap="dark" data-label="Only the small number is shown">Watch everything for <b>$12</b>/month</p>
      <p class="m-lock__sub">40,000+ titles, no extra charges</p>
      <button class="m-lock__cta">Join now</button>
      <p class="m-lock__terms" data-trap="dark" data-label="The lock-in is buried in the terms">By joining you agree to our <u>Terms of Service (52 clauses)</u></p>
      <p class="m-lock__ex">Clause 45 (Minimum term). The minimum term of this service is 24 months. Cancellation within that period incurs an early termination fee of $200.</p>
    </div>`,
  question: 'What should you check before joining?',
  choices: [
    { text: 'Nothing — $12 a month means you can leave whenever',
      feedback: 'A monthly figure says nothing at all about how long you are committed.' },
    { text: 'The minimum term and any early termination fee, before signing up',
      feedback: 'Correct. With a 24-month lock-in this is a $288 commitment.' },
    { text: 'Sign up first and read the terms afterwards',
      feedback: 'Signing up is the agreement. The order is the wrong way round.' }
  ],
  patternName: 'Hidden subscription',
  psychology: 'A small monthly number conceals the size of the whole commitment',
  explanation:
    '$12 a month with a 24-month minimum is a $288 contract. Terms that matter this much belong on the sign-up screen, not in clause 45. Several jurisdictions now require minimum terms and cancellation conditions to appear on the final confirmation screen for exactly this reason.',
  checks: [
    'Multiply any monthly price by the minimum term to get the real figure',
    'Search the terms for “termination”, “minimum term” and “fee”',
    'Check whether the confirmation screen states the commitment length'
  ]
},

19: {
  title: 'Anything else with that?',
  category: 'Judging legitimacy',
  url: 'gadget-lane.example/cart',
  mock: `
    <div class="m-cross">
      <div class="m-cross__main">Smartphone (handset)&nbsp;<b>$980.00</b></div>
      <p class="m-cross__h">Anything else with that?</p>
      <label class="m-cross__opt" data-trap="clear" data-label="Left unticked">
        <input type="checkbox"><span>Screen protector — $10.00</span>
      </label>
      <label class="m-cross__opt" data-trap="clear" data-label="Left unticked">
        <input type="checkbox"><span>Protective case — $20.00</span>
      </label>
      <div class="m-cross__sum" data-trap="clear" data-label="Not folded into the total">Total &nbsp;<b>$980.00</b></div>
      <button class="m-cross__cta">Go to checkout</button>
    </div>`,
  question: 'Is this add-on offer a deceptive pattern?',
  choices: [
    { text: 'Yes — pushing extras at checkout should be avoided',
      feedback: 'Offering is not the problem. The test is not whether something was offered but which way the default falls.' },
    { text: 'No — the choice is left with the customer',
      feedback: 'Correct. Nothing is ticked, nothing is in the total, and nothing happens unless you act.' },
    { text: 'Yes — even unticked, suggesting extras is pressure selling',
      feedback: 'By that standard no shop could ever show related items. The line is not drawn there.' }
  ],
  patternName: 'Legitimate cross-sell',
  psychology: 'What separates an offer from manufactured consent is where the default sits',
  explanation:
    'This screen looks a great deal like specimen 4. The difference is the initial state. There the boxes were ticked and leaving them counted as agreement; here they are empty and excluded from the total. Showing related products is simply saving the customer a search.',
  checks: [
    'Check whether anything arrives pre-ticked',
    'Check whether the suggested items are already in the total',
    'Keep “offering” and “assuming consent” as separate things'
  ]
},

20: {
  title: 'On the way out',
  category: 'Judging legitimacy',
  url: 'aoyama-roast.example/cart',
  mock: `
    <div class="m-exit">
      <div class="m-exit__card">
        <p class="m-exit__h">Still deciding?</p>
        <p class="m-exit__t">You can save a 10% discount code for later.</p>
        <div class="m-exit__btns" data-trap="clear" data-label="Declining is the same size">
          <button class="m-exit__no">Close</button>
          <button class="m-exit__yes">Save the code</button>
        </div>
        <p class="m-exit__note" data-trap="clear" data-label="States how often it appears">You will only see this once</p>
      </div>
    </div>`,
  question: 'This appeared as you moved to leave the page. Your verdict?',
  choices: [
    { text: 'All pop-ups interrupt the user and count as deceptive',
      feedback: 'Judging by format alone rules out legitimate offers too. Format is not the test.' },
    { text: 'No problem — it appears once, on exit, and declining is equally easy',
      feedback: 'Correct. Timing, frequency and an equally weighted decline are all present.' },
    { text: 'It is fine because there is a close button',
      feedback: 'A close button alone is not enough. In faint grey six-point type it exists without working.' }
  ],
  patternName: 'Legitimate exit intent',
  psychology: 'The same mechanism changes meaning with timing and with how balanced the options are',
  explanation:
    'A pop-up is not inherently a deceptive pattern. Three things decide it: whether it fires as you are leaving rather than as you arrive, whether it appears once, and whether declining carries the same visual weight as accepting. Make this full-screen on arrival with a grey six-point close link and the same mechanism becomes a deceptive pattern.',
  checks: [
    'Look at when it fires — on arrival, or as you leave',
    'Check whether declining is presented at the same size',
    'Check whether it comes back again and again'
  ]
}

};