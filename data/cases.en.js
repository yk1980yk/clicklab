/* ===========================================================
   設計モードのケース英語版。no をキーに日本語版へ上書きする。
   options の並び順は日本語版と揃えること。
   =========================================================== */
window.CASES_EN = {

1: {
  title: 'Free trial sign-ups',
  field: 'SaaS / acquisition',
  brief: 'You are the marketer on a SaaS product. Sign-ups for the one-month free trial have stalled, and you are presenting changes to the sign-up form next week.',
  metric: 'Sign-up rate',
  question: 'Which do you ship, aiming to grow sign-ups and the business behind them?',
  options: [
    {
      text: 'Require a card at sign-up, and note the automatic conversion to the paid plan in small grey type',
      later: [
        { label: 'Cancellation rate', v: '+62%' },
        { label: 'Support tickets', v: '+340%' },
        { label: 'Paid retention', v: '−28%' }
      ],
      verdict: 'Hidden subscription',
      explain:
        'Sign-ups jump. But what grew was the number of people who did not realise they were converting, and the moment billing starts that turns into cancellations and complaints. Support load spikes and refunds follow. A win on paper that loses money on next month\u2019s statement.',
      laterText: 'Most of the people who signed up did not know they would be charged.'
    },
    {
      text: 'Drop the card requirement, and state clearly on screen that a reminder email arrives three days before the trial ends',
      later: [
        { label: 'Paid conversion', v: '+18%' },
        { label: 'Cancellation rate', v: '−12%' },
        { label: 'Support tickets', v: '−9%' }
      ],
      verdict: 'A legitimate improvement',
      explain:
        'This removes the biggest barrier — handing over card details — and answers the unspoken fear of being charged without warning. Growth is smaller than the deceptive option, but the people who arrive actually use the product and convert on purpose.',
      laterText: 'The people who signed up used the trial and converted as expected.'
    },
    {
      text: 'Restyle the form with a bold gradient background in this year\u2019s colours',
      later: [
        { label: 'Sign-up rate', v: '±0%' },
        { label: 'Design time spent', v: '3 days' }
      ],
      verdict: 'Does nothing',
      explain:
        'A common suggestion that touches none of the reasons people hesitate — handing over a card, and being charged later. Changing how it looks does not move a decision that was never about how it looked.',
      laterText: 'Nothing moved. Only the build time was spent.'
    }
  ],
  lesson: 'Requiring a card and dropping the requirement both raise sign-ups. What differs is whether the gain survives into next month.'
},

2: {
  title: 'Abandoned baskets',
  field: 'Ecommerce / checkout',
  brief: 'On a clothing site, a lot of people fill a basket and leave without buying. You are designing what appears at the moment they try to go.',
  metric: 'Checkout completion',
  question: 'Which pop-up do you show as someone leaves the basket?',
  options: [
    {
      text: 'A full-screen warning: “Leave now and the items in your basket will be released”',
      later: [
        { label: 'Return visits', v: '−48%' },
        { label: 'Average review score', v: '4.4 → 3.6' },
        { label: 'Account deletions', v: '+55%' }
      ],
      verdict: 'Fake urgency',
      explain:
        'The basket is not released. This is a false alarm used to hurry people into buying. Because the purchase leaves a bad aftertaste, you trade that one order for the next visit — and repeat custom is what retail runs on.',
      laterText: 'The month\u2019s sales were up. The buyers did not come back.'
    },
    {
      text: '"You are $20 away from free delivery" — with a few qualifying small items shown',
      later: [
        { label: 'Average order value', v: '+12%' },
        { label: 'Return visits', v: '+9%' },
        { label: 'Average review score', v: '4.4 → 4.5' }
      ],
      verdict: 'A legitimate improvement',
      explain:
        'Delivery cost is one of the main reasons baskets are abandoned. This addresses that reason directly while lifting order value, and since nothing about it is false the purchase leaves no bad aftertaste.',
      laterText: 'Completion and order value both rose, and held the following month.'
    },
    {
      text: 'A large “Thank you for your order!” message in the centre of the screen',
      later: [
        { label: 'Checkout completion', v: '−5%' },
        { label: 'Support contacts', v: '"Did my order go through?"' }
      ],
      verdict: 'Does nothing',
      explain:
        'Showing a completion message before anything has been bought leads people to believe they are finished. There is no ill intent, but the confusion increases abandonment rather than reducing it.',
      laterText: 'Contacts rose from people who thought they had already ordered.'
    }
  ],
  lesson: 'An intervention that ignores why people leave will not move the number, whether it threatens or thanks them.'
},

3: {
  title: 'Newsletter sign-ups',
  field: 'Publishing / lead generation',
  brief: 'You run a content site and want more newsletter subscribers — not just more names, but readers who actually open it.',
  metric: 'Sign-ups',
  question: 'Which design do you ship to build a list that opens?',
  options: [
    {
      text: 'Add a quiet pre-ticked “subscribe to the newsletter” box to the whitepaper download form',
      later: [
        { label: 'Open rate', v: '−65%' },
        { label: 'Spam reports', v: '+420%' },
        { label: 'Inbox delivery rate', v: '98% → 71%' }
      ],
      verdict: 'Preselection',
      explain:
        'This one has a particular kind of blowback. When people who never chose to subscribe mark the mail as spam, your sending domain\u2019s reputation falls, and mail your existing readers actually wanted starts landing in junk. You trade an asset for a number.',
      laterText: 'Spam reports climbed and mail to existing readers stopped arriving reliably.'
    },
    {
      text: 'Describe exactly what the sign-up bonus contains, and state “once a week, Tuesday mornings”',
      later: [
        { label: 'Open rate', v: '+25%' },
        { label: 'Unsubscribe rate', v: '−30%' },
        { label: 'Inbox delivery rate', v: '98% → 98%' }
      ],
      verdict: 'A legitimate improvement',
      explain:
        'People hesitate because they do not know what will arrive or how often. Fill that in and the growth is modest, but the list consists of people who open it.',
      laterText: 'Most of the people who signed up are actually reading it.'
    },
    {
      text: 'Change the submit button to a bright orange',
      later: [
        { label: 'Sign-ups', v: '+2% (within noise)' },
        { label: 'Open rate', v: '±0%' }
      ],
      verdict: 'Does nothing',
      explain:
        'Button colour is a standard test and it does sometimes move. But the hesitation here is not knowing what will land in the inbox, so colour cannot resolve it. A textbook case of an option that looks effective while missing the cause.',
      laterText: 'It stayed within the margin of error.'
    }
  ],
  lesson: 'Counted on sign-ups alone, the pre-ticked box is the most successful thing you shipped this month.'
},

4: {
  title: 'Moving people to annual',
  field: 'SaaS / upsell',
  brief: 'You want monthly subscribers to switch to the discounted annual plan. You are designing the pricing screen.',
  metric: 'Switch rate',
  question: 'Which do you ship to move people onto annual billing?',
  options: [
    {
      text: 'Charge the full year immediately when the switch button is pressed, with no confirmation step',
      later: [
        { label: 'Refund requests', v: '+90%' },
        { label: 'Chargebacks', v: '12 cases' },
        { label: 'Social media', v: 'Negative posts spreading' }
      ],
      verdict: 'Sneaking',
      explain:
        'Fewer steps does raise the switch rate. But putting a large annual charge through without confirmation turns misclicks into refunds and chargebacks. Past a certain chargeback ratio the payment processor issues warnings, and in the worst case card payments stop working entirely.',
      laterText: 'Refund handling and a processor warning consumed the gain.'
    },
    {
      text: 'Show the saving in money — “two months free” — beside a monthly-equivalent comparison',
      later: [
        { label: 'Cancellation rate', v: '−20%' },
        { label: 'Refund requests', v: '±0%' },
        { label: 'Lifetime value', v: '+24%' }
      ],
      verdict: 'A legitimate improvement',
      explain:
        'Everything needed to decide is on the table, and the decision stays with the customer. Annual contracts lower churn, so growing them honestly pays off for longer than the deceptive route ever could.',
      laterText: 'More annual contracts meant lower churn.'
    },
    {
      text: 'Display the discount as a percentage: “Save 17% with annual billing”',
      later: [
        { label: 'Switch rate', v: '+3%' },
        { label: 'Time on page', v: '±0%' }
      ],
      verdict: 'Does nothing',
      explain:
        'Nothing false about it. But a percentage does not translate into a felt amount, so it does not help anyone decide. It is the same discount as the second option — only the telling is different, and that is the whole gap.',
      laterText: 'Barely moved.'
    }
  ],
  lesson: '“Two months free” and “17% off” are the very same discount. Only the way it is expressed differs.'
},

5: {
  title: 'A registration form nobody finishes',
  field: 'Ecommerce / accounts',
  brief: 'The registration form has twelve fields and 70% of people abandon it. The team is split between cutting fields and stopping the exits.',
  metric: 'Completion rate',
  question: 'Which do you ship to raise completions?',
  options: [
    {
      text: 'When someone tries to leave, automatically email the address they already typed, reminding them to finish',
      later: [
        { label: 'Spam reports', v: '+180%' },
        { label: 'Inbox delivery rate', v: '97% → 78%' },
        { label: 'Privacy complaints', v: '11 cases' }
      ],
      verdict: 'Sneaking',
      explain:
        'An address typed into an unfinished form is not permission to contact anyone. Completions rise, but you are mailing people who never agreed, so spam reports climb and mail to existing customers starts failing to arrive.',
      laterText: 'Mailing people who never agreed cost you your sending reputation.'
    },
    {
      text: 'Cut the form to email and password, and collect the rest optionally after sign-up',
      later: [
        { label: 'First-session usage', v: '+34%' },
        { label: 'Optional fields later completed', v: '62%' },
        { label: 'Support contacts', v: '−18%' }
      ],
      verdict: 'A legitimate improvement',
      explain:
        'People do not abandon because the page is long; they abandon because there is a lot to write. The rest can be gathered later, optionally — once someone has found the product useful, they tend to fill it in themselves.',
      laterText: 'People who registered started using the product, and the rest of the data came in later.'
    },
    {
      text: 'Keep all twelve fields but shrink the type so everything fits on one screen',
      later: [
        { label: 'Input error rate', v: '+22%' },
        { label: 'Mobile completion', v: '−15%' }
      ],
      verdict: 'Does nothing',
      explain:
        'This is what you propose if you think the problem is length. But people stop because of how much there is to write, not how far they must scroll. Shrinking everything increases mistypes and makes it worse.',
      laterText: 'Completions actually fell.'
    }
  ],
  lesson: 'Stopping people from leaving and removing the reason they leave are entirely different projects.'
},

6: {
  title: 'Losing people at payment',
  field: 'Ecommerce / checkout',
  brief: 'Plenty of people reach the payment screen and then leave. You are designing the last step.',
  metric: 'Payment completion',
  question: 'Which do you ship to raise completed payments?',
  options: [
    {
      text: 'Block the back button with a warning: “Leaving this page will void your order”',
      later: [
        { label: 'Return visits', v: '−52%' },
        { label: 'Immediate bounce', v: '+40%' },
        { label: 'Browser warnings', v: 'Triggered for some users' }
      ],
      verdict: 'Obstruction',
      explain:
        'The order is not voided. This interferes with a standard browser control on a false premise. You collect the order in front of you and reliably lose the next visit.',
      laterText: 'Payments were up that month. Those customers did not return.'
    },
    {
      text: 'State under the payment button: “30-day money-back guarantee. Cancel online in one click.”',
      later: [
        { label: 'Refund requests', v: '+1.2 points' },
        { label: 'Return visits', v: '+14%' },
        { label: 'Average review score', v: '4.2 → 4.4' }
      ],
      verdict: 'A legitimate improvement',
      explain:
        'What stops people at the last step is the thought of being stuck with a mistake. Showing that the seller carries that risk removes the hesitation. Refund requests do rise slightly — almost never by enough to outweigh the additional sales.',
      laterText: 'Refunds rose slightly, and purchases and return visits rose by more.'
    },
    {
      text: 'Change the payment button from red to a brighter green',
      later: [
        { label: 'Payment completion', v: '+2% (within noise)' }
      ],
      verdict: 'Does nothing',
      explain:
        'A standard A/B test that genuinely moves sometimes. But the hesitation at this step is about risk, so a colour change has nothing to work on.',
      laterText: 'It stayed within the margin of error.'
    }
  ],
  lesson: 'Blocking the back button and stating a refund guarantee produce almost the same number this month. They part company from next month onward.'
},

7: {
  title: 'Nobody picks a plan',
  field: 'SaaS / pricing',
  brief: 'There are twenty pricing plans and most people give up while comparing them. You are rebuilding how plans are presented.',
  metric: 'Plan selection rate',
  question: 'Which do you ship to get people choosing?',
  options: [
    {
      text: 'Show only the most expensive plan prominently and fold the rest behind “see other plans”',
      later: [
        { label: 'Plan changes and refunds', v: '+70%' },
        { label: '"I did not know there was a cheaper plan"', v: 'Frequent' },
        { label: 'Cancellation rate', v: '+18%' }
      ],
      verdict: 'Comparison prevention',
      explain:
        'This does not reduce the choices — it hides them. People who discover a cheaper plan after signing up feel deceived. Making the preferred option prominent and making the others invisible are not the same act.',
      laterText: 'People found the other plans after signing up and asked to change or refund.'
    },
    {
      text: 'Cut to three plans, mark one as recommended, and show all three at equal size in the same units',
      later: [
        { label: 'Cancellation rate', v: '−14%' },
        { label: 'Plan change requests', v: '−30%' },
        { label: 'Upgrade rate', v: '+12%' }
      ],
      verdict: 'A legitimate improvement',
      explain:
        'Too many options and people stop choosing at all. Three, with a recommendation to help, but all of them visible on equal terms — so whoever chooses does so knowingly. A plan chosen knowingly is a plan people keep.',
      laterText: 'People chose knowingly, and even cancellations fell.'
    },
    {
      text: 'Keep all twenty and build an exhaustive feature comparison table',
      later: [
        { label: 'Time on page', v: '+180%' },
        { label: 'Plan selection rate', v: '−10%' }
      ],
      verdict: 'Does nothing',
      explain:
        'The instinct is that more information makes choosing easier. In practice it raises the cost of comparing and deepens the paralysis. Time on page goes up because people are stuck, not engaged.',
      laterText: 'People looked for longer and chose less often.'
    }
  ],
  lesson: 'Reducing the number of options and hiding options are not the same thing.'
},

8: {
  title: 'How to show the reviews',
  field: 'Ecommerce / trust',
  brief: 'Your flagship product averages 3.8 stars, with a genuine mix of praise and criticism. You are deciding how reviews appear on the product page.',
  metric: 'Purchase rate',
  question: 'How do you present the reviews?',
  options: [
    {
      text: 'Show only 4-star-and-above reviews, and push the rest to the end of a “least helpful” sort',
      later: [
        { label: 'Return rate', v: '+62%' },
        { label: 'New negative reviews', v: '+90%' },
        { label: 'Average rating', v: '3.8 → 3.1' }
      ],
      verdict: 'Fake social proof',
      explain:
        'Raise expectations without raising the product and the gap comes back as returns and one-star reviews. The negatives you created by hiding the old ones outnumber the ones you hid.',
      laterText: 'People bought expecting more than arrived.'
    },
    {
      text: 'Show every review, with filters for “critical only” and for specific topics like sizing',
      later: [
        { label: 'Return rate', v: '−28%' },
        { label: 'Average rating', v: '3.8 → 4.0' },
        { label: 'Repeat purchase', v: '+16%' }
      ],
      verdict: 'A legitimate improvement',
      explain:
        'Showing the criticism really can sell more. Someone who bought knowing the downsides is not surprised by what arrives. And the fact that nothing was hidden is itself information about the seller.',
      laterText: 'People bought knowing what they were getting, and returns fell.'
    },
    {
      text: 'Move the review section to the very bottom of the page where it is less visible',
      later: [
        { label: 'Purchase rate', v: '+3%' },
        { label: 'Reviews actually read', v: '−45%' }
      ],
      verdict: 'Does nothing',
      explain:
        'The idea is to limit the damage by limiting visibility. But reviews also persuade people to buy. Bury the criticism and you bury the praise with it.',
      laterText: 'Barely moved.'
    }
  ],
  lesson: 'Showing the bad reviews really can sell more than hiding them.'
}

};