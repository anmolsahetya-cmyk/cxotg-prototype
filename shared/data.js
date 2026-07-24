/* ============================================================
   Pearl CX Prototype — Shared Dummy Data
   ============================================================ */

const DATA = {

  /* ----- Logged-in user ----- */
  user: {
    name: 'Sarah Chen',
    email: 'sarah.chen@retailco.com',
    role: 'CX Manager',
    org: 'RetailCo International',
    initials: 'SC',
  },

  /* ----- Segments ----- */
  segments: [
    { id: 1, name: 'Retail - North' },
    { id: 2, name: 'Enterprise - West' },
    { id: 3, name: 'SMB - East' },
    { id: 4, name: 'Hospitality' },
    { id: 5, name: 'Finance - Global' },
    { id: 6, name: 'Healthcare - US' },
  ],

  /* ----- Managers / owners ----- */
  managers: [
    { id: 1, name: 'Sarah Chen',   email: 'sarah.chen@retailco.com',   initials: 'SC', avatarColor: '#1B3380' },
    { id: 2, name: 'Marcus Rivera',email: 'marcus.r@retailco.com',     initials: 'MR', avatarColor: '#3FCA5A' },
    { id: 3, name: 'Priya Patel',  email: 'priya.p@retailco.com',      initials: 'PP', avatarColor: '#FF9145' },
  ],

  /* ----- Dashboard state defaults ----- */
  currentSegment: 'Retail - North',
  dateRangeLabel: 'Jun 29, 2022 - Jun 29, 2026',
  dateRangeStart: '2022-06-29', // ISO bounds for the "All time" default — kept in sync with dateRangeLabel
  dateRangeEnd: '2026-06-29',
  notificationCount: 44,

  /* ----- NPS Dashboard Metrics ----- */
  nps: {
    score: -45.26,
    totalResponses: 21082,
    promoters: 18,
    passives: 18,
    detractors: 63,
    promoterCount: 3835,
    passiveCount: 3870,
    detractorCount: 13377,
    goal: 0,
    gap: -45.26,
  },

  /* ----- Closedloop Metrics ----- */
  closedloop: {
    totalTickets: 105,
    critical: { pct: 3,  count: 3  },
    high:     { pct: 18, count: 19 },
    medium:   { pct: 21, count: 22 },
    low:      { pct: 58, count: 61 },
  },

  ticketSummary: {
    new: 12,
    open: 8,
    escalated: 3,
    resolved: 45,
  },

  responseSummary: {
    total: 21082,
    unread: 44,
  },

  /* ----- AI Root Cause Tags ----- */
  rootCauseTags: [
    { id: 1, name: 'Long wait time' },
    { id: 2, name: 'Product defect' },
    { id: 3, name: 'Billing issue' },
    { id: 4, name: 'Poor communication' },
    { id: 5, name: 'Missing feature' },
    { id: 6, name: 'Onboarding friction' },
    { id: 7, name: 'Technical failure' },
  ],

  /* ----- Email Templates ----- */
  emailTemplates: [
    {
      id: 0,
      title: 'Default',
      templateText: '',
    },
    {
      id: 1,
      title: 'Acknowledgment of Your Complaint',
      templateText: `Dear [Customer Name],\n\nThank you for reaching out to us. We have received your complaint and want to assure you that we take this matter very seriously.\n\nOur team is currently reviewing your case and will respond with a resolution within 24 hours. We sincerely apologize for any inconvenience this has caused and appreciate your patience.\n\nBest regards,\n[Your Name]`,
    },
    {
      id: 2,
      title: 'Thank you for getting in touch!',
      templateText: `Dear [Customer Name],\n\nThank you for contacting us. We truly appreciate you taking the time to share your feedback with us.\n\nYour input is invaluable and helps us improve our services. A member of our team will be in touch shortly to address your concern.\n\nWarm regards,\n[Your Name]`,
    },
  ],

  /* ----- AI Email Draft variations (pre-written, shown after "Generate" spinner) -----
     Multiple variations so Regenerate/Refine don't show identical text twice in a row.
     `style` is matched against Refine sheet Tone/Length selections to pick a variation. ----- */
  aiEmailDrafts: [
    {
      style: 'professional',
      subject: 'Following up on your experience — we\'re here to help',
      body: `Dear James,

Thank you for taking the time to share your feedback with us. I completely understand how frustrating it must have been to encounter a billing discrepancy during your renewal — this is not the experience we want for any of our customers, and I sincerely apologize for the inconvenience this has caused.

I've personally reviewed your account and can see the duplicate charge that occurred on June 15th. Our finance team has already initiated a full refund of $1,247.00, which will appear on your statement within 3–5 business days. I've also applied a 15% loyalty credit to your account for the next billing cycle as a gesture of goodwill.

If there's anything else I can do to make this right, or if you'd like to discuss any aspect of your account, please don't hesitate to reach out directly. Your satisfaction is our highest priority, and we truly value your continued partnership with us.

Warm regards,
Sarah Chen
CX Manager, RetailCo International`,
    },
    {
      style: 'concise',
      subject: 'Quick update on your refund',
      body: `Dear James,

Thank you for your patience regarding the duplicate charge on your renewal. I've confirmed the error and initiated a full refund of $1,247.00, which will arrive within 3–5 business days. A 15% loyalty credit has also been applied to your next billing cycle.

Please let me know if there's anything else I can help with.

Warm regards,
Sarah Chen
CX Manager, RetailCo International`,
    },
    {
      style: 'empathetic',
      subject: 'We hear you, James — here\'s what we\'re doing',
      body: `Dear James,

I want to start by saying how sorry I am for the stress this billing issue has caused, especially given how long you've trusted us as a customer — that matters to us, and we don't take it lightly.

I've personally looked into your account and confirmed the duplicate charge from June 15th. Our finance team is issuing a full refund of $1,247.00, which should reach your statement within 3–5 business days. I've also added a 15% loyalty credit to your next billing cycle — a small gesture, but one I hope shows how much we value you.

If anything about this still doesn't feel right, or if there's more I can do, please reach out any time — I'm here.

Warm regards,
Sarah Chen
CX Manager, RetailCo International`,
    },
  ],

  /* ----- Tone Options ----- */
  toneOptions: [
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'empathetic',   label: 'Empathetic',   icon: '💙' },
    { id: 'casual',       label: 'Casual',        icon: '😊' },
    { id: 'formal',       label: 'Formal',        icon: '📋' },
  ],

  /* ----- Notifications ----- */
  notifications: [
    {
      id: 1,
      title: 'New detractor alert',
      body: 'James Whitfield (NPS: 2) in Enterprise - West',
      time: '2 min ago',
      read: false,
      type: 'alert',
    },
    {
      id: 2,
      title: 'Ticket escalated',
      body: 'TKT-1041 escalated to Critical by Marcus Rivera',
      time: '15 min ago',
      read: false,
      type: 'escalation',
    },
    {
      id: 3,
      title: 'Comment added',
      body: 'Priya Patel commented on TKT-1038',
      time: '1 hour ago',
      read: true,
      type: 'comment',
    },
    {
      id: 4,
      title: 'Ticket resolved',
      body: 'TKT-1035 marked as Resolved by Sarah Chen',
      time: '3 hours ago',
      read: true,
      type: 'resolved',
    },
    {
      id: 5,
      title: 'New survey response',
      body: '24 new responses received in Retail - North',
      time: 'Yesterday',
      read: true,
      type: 'response',
    },
  ],

  /* ----- Tickets (15 items) ----- */
  tickets: [
    {
      id: 'TKT-1041',
      customer: 'James Whitfield',
      email: 'j.whitfield@techcorp.com',
      phone: '+1 (415) 555-0142',
      statusId: 2, // escalated
      priorityId: 3, // critical
      typeId: 1, // detractor alert
      assigneeId: 1, // Sarah Chen
      segmentId: 2, // Enterprise - West
      npsScore: 2,
      npsLabel: 'Detractor',
      npsVerbatim: 'Charged twice for my renewal and no one told me why. Been a customer for 4 years — this is unacceptable.',
      issueDate: '2026-06-18',
      isOverdue: true,
      title: 'Billing discrepancy on annual subscription renewal',
      description: 'Customer was charged twice for their annual subscription renewal on June 15th. The amount of $1,247.00 was debited twice from their corporate card. Customer has been with us for 4 years and is extremely frustrated. Needs immediate resolution and refund.',
      suggestedRootCause: { path: 'Billing Issues > Payment Errors', tag: 'Double charge', confidence: 0.92 },
      comments: [
        {
          id: 1, author: 'Sarah Chen', initials: 'SC', time: '2 hours ago', date: 'Jun 18, 2026',
          text: 'I have escalated this to the billing team. Refund is being processed.',
          isInternal: true,
          replies: [
            { id: 11, author: 'Marcus Rivera', initials: 'MR', date: 'Jun 18, 2026', text: 'Thanks Sarah, I have informed the finance team.' },
            { id: 12, author: 'Priya Patel', initials: 'PP', date: 'Jun 18, 2026', text: 'Good to know. Customer has been notified.' },
          ],
        },
        {
          id: 2, author: 'Marcus Rivera', initials: 'MR', time: '1 hour ago', date: 'Jun 18, 2026',
          text: 'Finance team confirmed the duplicate charge. Refund initiated — 3-5 business days.',
          isInternal: true,
          replies: [
            { id: 21, author: 'Sarah Chen', initials: 'SC', date: 'Jun 18, 2026', text: 'Great, please follow up with the customer once processed.' },
          ],
        },
        {
          id: 3, author: 'Priya Patel', initials: 'PP', time: '30 min ago', date: 'Jun 18, 2026',
          text: 'Customer notified via email. Will follow up tomorrow.',
          isInternal: false,
          replies: [],
        },
      ],
      activity: [
        { id: 1, text: 'Ticket#TKT-1041 has been <b>overdue</b>.', actor: 'Anonymous', date: 'Jun 29, 2026', type: 'create' },
        { id: 2, text: 'The priority of ticket#TKT-1041 has been changed.', actor: 'Sarah Chen', date: 'Jun 25, 2026', type: 'priority' },
        { id: 3, text: 'The priority of ticket#TKT-1041 has been changed.', actor: 'Sarah Chen', date: 'Jun 22, 2026', type: 'priority' },
        { id: 4, text: 'A new comment has been added for ticket#TKT-1041', actor: 'Marcus Rivera', date: 'Jun 20, 2026', type: 'comment' },
        { id: 5, text: 'A new comment has been added for ticket#TKT-1041', actor: 'Priya Patel', date: 'Jun 20, 2026', type: 'comment' },
        { id: 6, text: 'Status changed from Open → Escalated', actor: 'Marcus Rivera', date: 'Jun 18, 2026', type: 'status' },
        { id: 7, text: 'Action email sent to j.whitfield@techcorp.com', actor: 'Sarah Chen', date: 'Jun 18, 2026', type: 'email' },
        { id: 8, text: 'Ticket created from detractor alert', actor: 'System', date: 'Jun 18, 2026', type: 'create' },
      ],
      /* ----- Action email threads (Send Email flow's Action History) — newest first ----- */
      emailHistory: [
        {
          id: 5,
          subject: 'Confirming your refund and loyalty credit',
          sentBy: 'Sarah Chen',
          sentDate: 'Jun 25, 2026',
          messages: [
            { from: 'agent', author: 'Sarah Chen', date: 'Jun 25, 2026', text: 'Hi James, confirming the $1,247.00 refund has posted to your card, along with a 15% loyalty credit applied to your next billing cycle. Thank you for your patience.' },
            { from: 'customer', author: 'James Whitfield', date: 'Jun 25, 2026', text: 'Received the refund, thank you for taking care of this so quickly.' },
          ],
        },
        {
          id: 4,
          subject: 'Re: Billing discrepancy on your account',
          sentBy: 'Marcus Rivera',
          sentDate: 'Jun 22, 2026',
          messages: [
            { from: 'agent', author: 'Marcus Rivera', date: 'Jun 22, 2026', text: 'Hi James, wanted to give you a quick update — finance has confirmed the duplicate charge and the refund is being processed now.' },
          ],
        },
        {
          id: 3,
          subject: 'Your duplicate charge has been identified',
          sentBy: 'Sarah Chen',
          sentDate: 'Jun 20, 2026',
          messages: [
            { from: 'agent', author: 'Sarah Chen', date: 'Jun 20, 2026', text: 'Hi James, I\'ve personally reviewed your account and found the duplicate charge from June 15th. I\'m escalating this to our finance team for an immediate refund.' },
            { from: 'customer', author: 'James Whitfield', date: 'Jun 20, 2026', text: 'Thank you, please let me know once it\'s resolved. This has been frustrating.' },
            { from: 'agent', author: 'Sarah Chen', date: 'Jun 20, 2026', text: 'Understood, I\'ll keep you updated every step of the way.' },
          ],
        },
        {
          id: 2,
          subject: 'We\'re looking into your billing issue',
          sentBy: 'Sarah Chen',
          sentDate: 'Jun 19, 2026',
          messages: [
            { from: 'agent', author: 'Sarah Chen', date: 'Jun 19, 2026', text: 'Hi James, thank you for reaching out about the duplicate charge on your renewal. We take this seriously and are investigating right away.' },
            { from: 'customer', author: 'James Whitfield', date: 'Jun 19, 2026', text: 'Appreciate the quick response. Been a customer for 4 years, this really shouldn\'t happen.' },
          ],
        },
        {
          id: 1,
          subject: 'Thank you for contacting us',
          sentBy: 'Sarah Chen',
          sentDate: 'Jun 18, 2026',
          messages: [
            { from: 'agent', author: 'Sarah Chen', date: 'Jun 18, 2026', text: 'Hi James, thanks for flagging the billing issue on your renewal. We\'ve received your message and a member of our team is reviewing your account now.' },
          ],
        },
      ],
      rootCauses: [3], // billing issue
      centralizedRootCauses: [
        { path: 'Billing Issues > Payment Errors', tag: 'Double charge' },
        { path: 'Billing Issues > Account', tag: 'Annual renewal' },
      ],
      tags: ['Billing', 'Refund', 'Critical Account'],
    },
    {
      id: 'TKT-1042',
      customer: 'Priya Sharma',
      email: 'priya.s@hospitalitygroup.co',
      statusId: 0, // new
      priorityId: 2, // high
      typeId: 1,
      assigneeId: 2,
      segmentId: 4,
      npsScore: 4,
      npsLabel: 'Detractor',
      issueDate: '2026-06-20',
      isOverdue: false,
      title: 'Check-in kiosk software crashes repeatedly',
      description: 'Multiple guests at the downtown location have reported that the self-check-in kiosks freeze and restart mid-transaction. Estimated 20+ guests affected over the past 3 days.',
      comments: [
        { id: 1, author: 'Marcus Rivera', initials: 'MR', time: '5 hours ago', text: 'IT team is investigating the kiosk firmware.' },
      ],
      activity: [
        { id: 1, text: 'Ticket created from detractor alert', actor: 'System', time: '2026-06-20 08:00', type: 'create' },
        { id: 2, text: 'Assigned to Marcus Rivera', actor: 'System', time: '2026-06-20 08:01', type: 'assign' },
      ],
      rootCauses: [7],
      tags: ['Technical', 'Kiosk', 'Multiple Guests'],
    },
    {
      id: 'TKT-1043',
      customer: 'Robert Kim',
      email: 'r.kim@globalfinance.net',
      phone: '+1 (212) 555-0198',
      statusId: 1, // open
      priorityId: 1, // medium
      typeId: 0,
      assigneeId: 3,
      segmentId: 5,
      npsScore: 5,
      npsLabel: 'Detractor',
      issueDate: '2026-06-17',
      isOverdue: false,
      title: 'Cannot access premium reporting dashboard',
      description: 'Customer upgraded to the Premium plan last week but the advanced reporting features are still locked in their account. Support ticket first filed on June 17th with no resolution.',
      comments: [
        { id: 1, author: 'Priya Patel', initials: 'PP', time: '1 day ago', text: 'Account provisioning team has been notified.' },
        { id: 2, author: 'Priya Patel', initials: 'PP', time: '4 hours ago', text: 'Still waiting on provisioning. Escalating internally.' },
      ],
      activity: [
        { id: 1, text: 'Manual ticket created', actor: 'Priya Patel', time: '2026-06-17 14:30', type: 'create' },
        { id: 2, text: 'Status changed from New → Open', actor: 'Priya Patel', time: '2026-06-17 14:31', type: 'status' },
      ],
      rootCauses: [5],
      tags: ['Access Issue', 'Premium Plan'],
    },
    {
      id: 'TKT-1044',
      customer: 'Elena Vasquez',
      email: 'elena.v@northretail.com',
      statusId: 3, // resolved
      priorityId: 0, // low
      typeId: 0,
      assigneeId: 1,
      segmentId: 1,
      npsScore: 8,
      npsLabel: 'Passive',
      issueDate: '2026-06-10',
      isOverdue: false,
      title: 'Delay in receiving email confirmation after purchase',
      description: 'Customer did not receive order confirmation emails. Issue was traced to a misconfigured SMTP setting on the retail portal.',
      comments: [
        { id: 1, author: 'Sarah Chen', initials: 'SC', time: '5 days ago', text: 'SMTP configuration fixed. Confirmation emails now working.' },
      ],
      activity: [
        { id: 1, text: 'Manual ticket created', actor: 'Sarah Chen', time: '2026-06-10 10:00', type: 'create' },
        { id: 2, text: 'Status changed from New → Open', actor: 'Sarah Chen', time: '2026-06-10 10:05', type: 'status' },
        { id: 3, text: 'Status changed from Open → Resolved', actor: 'Sarah Chen', time: '2026-06-12 16:00', type: 'status' },
      ],
      rootCauses: [4],
      tags: ['Email', 'SMTP'],
    },
    {
      id: 'TKT-1045',
      customer: 'David Okafor',
      email: 'd.okafor@smbbusiness.io',
      statusId: 1, // open
      priorityId: 2, // high
      typeId: 1,
      assigneeId: 2,
      segmentId: 3,
      npsScore: 3,
      npsLabel: 'Detractor',
      issueDate: '2026-06-19',
      isOverdue: true,
      title: 'Onboarding flow unclear — missed several setup steps',
      description: 'New customer signed up 2 weeks ago and still hasn\'t completed onboarding. Multiple steps in the wizard are confusing and the help documentation is outdated.',
      comments: [],
      activity: [
        { id: 1, text: 'Ticket created from detractor alert', actor: 'System', time: '2026-06-19 11:00', type: 'create' },
        { id: 2, text: 'Assigned to Marcus Rivera', actor: 'System', time: '2026-06-19 11:01', type: 'assign' },
      ],
      rootCauses: [6],
      tags: ['Onboarding', 'Documentation'],
    },
    {
      id: 'TKT-1046',
      customer: 'Aisha Thompson',
      email: 'a.thompson@healthsys.org',
      statusId: 0, // new
      priorityId: 3, // critical
      typeId: 1,
      assigneeId: 3,
      segmentId: 6,
      npsScore: 1,
      npsLabel: 'Detractor',
      issueDate: '2026-06-21',
      isOverdue: false,
      title: 'Patient data export feature not working',
      description: 'Critical compliance feature — patient data export for monthly regulatory reporting is returning an error. Affects approximately 3,000 patient records. Regulatory deadline in 5 days.',
      comments: [
        { id: 1, author: 'Priya Patel', initials: 'PP', time: '1 hour ago', text: 'Engineering team alerted. This is a P0.' },
      ],
      activity: [
        { id: 1, text: 'Ticket created from detractor alert', actor: 'System', time: '2026-06-21 07:30', type: 'create' },
        { id: 2, text: 'Priority set to Critical', actor: 'Priya Patel', time: '2026-06-21 07:45', type: 'priority' },
      ],
      rootCauses: [7],
      tags: ['Compliance', 'Data Export', 'P0'],
    },
    {
      id: 'TKT-1047',
      customer: 'Lucas Fernandez',
      email: 'lucas.f@retailco.com',
      statusId: 3, // resolved
      priorityId: 1, // medium
      typeId: 0,
      assigneeId: 1,
      segmentId: 1,
      npsScore: 9,
      npsLabel: 'Promoter',
      issueDate: '2026-06-08',
      isOverdue: false,
      title: 'Request for additional user seats on Enterprise plan',
      description: 'Customer requested 5 additional seats for their team. Provisioning was delayed due to billing cycle mismatch.',
      comments: [
        { id: 1, author: 'Sarah Chen', initials: 'SC', time: '1 week ago', text: 'Seats provisioned and billing prorated. Customer confirmed happy.' },
      ],
      activity: [
        { id: 1, text: 'Manual ticket created', actor: 'Sarah Chen', time: '2026-06-08 09:00', type: 'create' },
        { id: 2, text: 'Status changed from New → Resolved', actor: 'Sarah Chen', time: '2026-06-09 14:00', type: 'status' },
      ],
      rootCauses: [],
      tags: ['Seats', 'Enterprise'],
    },
    {
      id: 'TKT-1048',
      customer: 'Mei-Ling Zhang',
      email: 'm.zhang@financecorp.hk',
      statusId: 1, // open
      priorityId: 2, // high
      typeId: 1,
      assigneeId: 2,
      segmentId: 5,
      npsScore: 3,
      npsLabel: 'Detractor',
      issueDate: '2026-06-16',
      isOverdue: true,
      title: 'Currency conversion showing incorrect rates',
      description: 'Customer in Hong Kong is seeing incorrect USD/HKD conversion rates on their invoices. Overpayment of ~HKD 4,200 over the last 3 invoices.',
      comments: [
        { id: 1, author: 'Marcus Rivera', initials: 'MR', time: '2 days ago', text: 'Finance team reviewing. Correction will be issued.' },
      ],
      activity: [
        { id: 1, text: 'Ticket created from detractor alert', actor: 'System', time: '2026-06-16 06:00', type: 'create' },
        { id: 2, text: 'Assigned to Marcus Rivera', actor: 'System', time: '2026-06-16 06:01', type: 'assign' },
      ],
      rootCauses: [3],
      tags: ['Billing', 'Currency', 'International'],
    },
    {
      id: 'TKT-1049',
      customer: 'Samuel Osei',
      email: 's.osei@smbafrica.co',
      statusId: 3, // resolved
      priorityId: 0, // low
      typeId: 0,
      assigneeId: 3,
      segmentId: 3,
      npsScore: 7,
      npsLabel: 'Passive',
      issueDate: '2026-06-05',
      isOverdue: false,
      title: 'Mobile app slow on Android 12 devices',
      description: 'Customer reported sluggish performance on Android 12. Issue was a known Hermes engine bug, patched in the latest app release.',
      comments: [
        { id: 1, author: 'Priya Patel', initials: 'PP', time: '2 weeks ago', text: 'App update v2.4.1 released. Customer confirmed performance improved.' },
      ],
      activity: [
        { id: 1, text: 'Manual ticket created', actor: 'Priya Patel', time: '2026-06-05 13:00', type: 'create' },
        { id: 2, text: 'Status changed from New → Resolved', actor: 'Priya Patel', time: '2026-06-07 10:00', type: 'status' },
      ],
      rootCauses: [7],
      tags: ['Mobile', 'Performance', 'Android'],
    },
    {
      id: 'TKT-1050',
      customer: 'Hannah Mueller',
      email: 'h.mueller@europehospitality.de',
      statusId: 0, // new
      priorityId: 1, // medium
      typeId: 1,
      assigneeId: 1,
      segmentId: 4,
      npsScore: 5,
      npsLabel: 'Detractor',
      issueDate: '2026-06-22',
      isOverdue: false,
      title: 'GDPR data deletion request not fulfilled within 72 hours',
      description: 'Customer submitted a GDPR right-to-erasure request on June 20th. Legally required to process within 72 hours. Deadline has passed.',
      comments: [],
      activity: [
        { id: 1, text: 'Ticket created from detractor alert', actor: 'System', time: '2026-06-22 08:00', type: 'create' },
      ],
      rootCauses: [4],
      tags: ['GDPR', 'Compliance', 'Legal'],
    },
    {
      id: 'TKT-1051',
      customer: 'Carlos Reyes',
      email: 'c.reyes@latinretail.mx',
      statusId: 3,
      priorityId: 1,
      typeId: 0,
      assigneeId: 2,
      segmentId: 1,
      npsScore: 8,
      npsLabel: 'Passive',
      issueDate: '2026-06-03',
      isOverdue: false,
      title: 'Integration with Salesforce CRM stopped syncing',
      description: 'Salesforce integration stopped pushing ticket updates after a Salesforce API version update. Fixed by updating the OAuth scope.',
      comments: [
        { id: 1, author: 'Marcus Rivera', initials: 'MR', time: '2 weeks ago', text: 'OAuth scope updated. Sync restored.' },
      ],
      activity: [
        { id: 1, text: 'Manual ticket created', actor: 'Marcus Rivera', time: '2026-06-03 10:00', type: 'create' },
        { id: 2, text: 'Status changed from Open → Resolved', actor: 'Marcus Rivera', time: '2026-06-04 11:00', type: 'status' },
      ],
      rootCauses: [7],
      tags: ['Integration', 'Salesforce', 'API'],
    },
    {
      id: 'TKT-1052',
      customer: 'Fatima Al-Hassan',
      email: 'f.alhassan@menagroup.ae',
      statusId: 1,
      priorityId: 2,
      typeId: 1,
      assigneeId: 3,
      segmentId: 5,
      npsScore: 4,
      npsLabel: 'Detractor',
      issueDate: '2026-06-20',
      isOverdue: false,
      title: 'NPS survey not delivered in Arabic language',
      description: 'Customer base in UAE requires Arabic survey delivery. The language setting is configured but survey emails are still being sent in English.',
      comments: [
        { id: 1, author: 'Priya Patel', initials: 'PP', time: '1 day ago', text: 'Localization team investigating.' },
      ],
      activity: [
        { id: 1, text: 'Ticket created from detractor alert', actor: 'System', time: '2026-06-20 12:00', type: 'create' },
        { id: 2, text: 'Assigned to Priya Patel', actor: 'System', time: '2026-06-20 12:01', type: 'assign' },
      ],
      rootCauses: [4],
      tags: ['Localization', 'Arabic', 'Survey'],
    },
    {
      id: 'TKT-1053',
      customer: 'Tom Bradley',
      email: 't.bradley@northretail.com',
      statusId: 3,
      priorityId: 0,
      typeId: 0,
      assigneeId: 1,
      segmentId: 1,
      npsScore: 9,
      npsLabel: 'Promoter',
      issueDate: '2026-06-01',
      isOverdue: false,
      title: 'Request to add custom branding to survey emails',
      description: 'Customer requested branded email headers with their logo. Completed by design team.',
      comments: [
        { id: 1, author: 'Sarah Chen', initials: 'SC', time: '3 weeks ago', text: 'Custom branding applied. Customer approved.' },
      ],
      activity: [
        { id: 1, text: 'Manual ticket created', actor: 'Sarah Chen', time: '2026-06-01 09:00', type: 'create' },
        { id: 2, text: 'Status changed from New → Resolved', actor: 'Sarah Chen', time: '2026-06-03 15:00', type: 'status' },
      ],
      rootCauses: [],
      tags: ['Branding', 'Customization'],
    },
    {
      id: 'TKT-1054',
      customer: 'Yuki Tanaka',
      email: 'yuki.t@jpfinance.co.jp',
      statusId: 0,
      priorityId: 2,
      typeId: 1,
      assigneeId: 2,
      segmentId: 5,
      npsScore: 2,
      npsLabel: 'Detractor',
      issueDate: '2026-06-22',
      isOverdue: false,
      title: 'Two-factor authentication failing for Japanese phone numbers',
      description: '2FA SMS not being delivered to Japanese mobile numbers (+81 prefix). Multiple enterprise accounts affected.',
      comments: [],
      activity: [
        { id: 1, text: 'Ticket created from detractor alert', actor: 'System', time: '2026-06-22 03:00', type: 'create' },
        { id: 2, text: 'Assigned to Marcus Rivera', actor: 'System', time: '2026-06-22 09:00', type: 'assign' },
      ],
      rootCauses: [7],
      tags: ['2FA', 'SMS', 'International'],
    },
    {
      id: 'TKT-1055',
      customer: 'Grace Njoku',
      email: 'g.njoku@healthngo.ng',
      statusId: 1,
      priorityId: 1,
      typeId: 0,
      assigneeId: 3,
      segmentId: 6,
      npsScore: 6,
      npsLabel: 'Detractor',
      issueDate: '2026-06-14',
      isOverdue: false,
      title: 'Survey response export to Excel missing custom columns',
      description: 'Customer exports survey data to Excel but their 4 custom question columns are not included in the export file. Critical for their grant reporting.',
      comments: [
        { id: 1, author: 'Priya Patel', initials: 'PP', time: '3 days ago', text: 'Engineering has identified the bug. Fix in next sprint.' },
      ],
      activity: [
        { id: 1, text: 'Manual ticket created', actor: 'Priya Patel', time: '2026-06-14 11:00', type: 'create' },
        { id: 2, text: 'Status changed from New → Open', actor: 'Priya Patel', time: '2026-06-14 11:05', type: 'status' },
      ],
      rootCauses: [5],
      tags: ['Export', 'Excel', 'Bug'],
    },
    {
      id: 'TKT-1056',
      customer: null,
      email: 'anonymous-web-visitor@no-reply.pearlcx.com',
      statusId: 0, // new
      priorityId: 1, // medium
      typeId: 0,
      assigneeId: 1,
      segmentId: 3,
      npsLabel: 'Passive',
      issueDate: '2026-07-10',
      isOverdue: false,
      title: 'Unable to submit feedback form on public survey link',
      description: 'Submitted via the anonymous public survey link — no account or contact details on file. The submit button appears greyed out on mobile Safari after answering the third question.',
      comments: [],
      activity: [],
      tags: ['Public Survey', 'Mobile'],
    },
    {
      id: 'TKT-1057',
      customer: 'Daniela Ferreira',
      email: 'd.ferreira@braziltech.com.br',
      phone: '+55 (11) 5555-0177',
      statusId: 1, // open
      priorityId: 2, // high
      typeId: 0,
      assigneeId: 2,
      segmentId: 2,
      npsScore: 3,
      npsLabel: 'Detractor',
      npsVerbatim: 'The dashboard has been unusable for over a week and support keeps closing my tickets without a real fix.',
      issueDate: '2026-07-05',
      isOverdue: true,
      title: 'Analytics dashboard fails to load for large accounts',
      description: 'Customer manages one of our largest accounts in the LATAM region and has reported that the analytics dashboard has been intermittently failing to load for the past nine days, showing a blank white screen with no error message roughly six out of every ten attempts. The issue appears to correlate with accounts that have more than 50,000 survey responses in a single project, suggesting a possible timeout or memory limit being hit on the backend aggregation query. The customer has already tried clearing their browser cache, using a different browser (both Chrome and Firefox were tested), and accessing from a different network, all with the same intermittent failure pattern. This is affecting their ability to prepare a quarterly board report due in five days, and they have escalated twice through their account manager. Engineering was looped in on July 3rd but has not yet reproduced the issue in a staging environment, possibly because staging does not have a project of comparable size. Customer is requesting either an expedited fix or a manual data export as a stopgap so they can build the report outside the platform.',
      comments: [
        { id: 1, author: 'Marcus Rivera', initials: 'MR', time: '1 day ago', date: 'Jul 12, 2026', text: 'Looped in engineering — trying to reproduce with a large synthetic dataset in staging.', isInternal: true, replies: [] },
      ],
      activity: [
        { id: 1, text: 'Manual ticket created', actor: 'Marcus Rivera', date: 'Jul 5, 2026', type: 'create' },
        { id: 2, text: 'Status changed from New → Open', actor: 'Marcus Rivera', date: 'Jul 5, 2026', type: 'status' },
        { id: 3, text: 'Escalated by account manager', actor: 'Marcus Rivera', date: 'Jul 9, 2026', type: 'status' },
        { id: 4, text: 'A new comment has been added for ticket#TKT-1057', actor: 'Marcus Rivera', date: 'Jul 12, 2026', type: 'comment' },
      ],
      tags: ['Performance', 'Dashboard', 'Enterprise'],
    },
  ],

  /* ----- Centralized Root Cause Tree ----- */
  centralizedRootCauseTree: [
    {
      id: 'service_quality',
      name: 'Service Quality',
      items: [
        { id: 'sq1', name: 'Slow response time', subItems: [] },
        { id: 'sq2', name: 'Unprofessional agent', subItems: [] },
        {
          id: 'sq3', name: 'Resolution issues',
          subItems: [
            { id: 'sq3a', name: 'Issue not resolved' },
            { id: 'sq3b', name: 'Incorrect resolution' },
            { id: 'sq3c', name: 'Repeated contacts needed' },
          ],
        },
      ],
    },
    {
      id: 'billing',
      name: 'Billing & Payments',
      items: [
        { id: 'b1', name: 'Incorrect charge', subItems: [] },
        { id: 'b2', name: 'Refund not received', subItems: [] },
        {
          id: 'b3', name: 'Subscription issues',
          subItems: [
            { id: 'b3a', name: 'Auto-renewal error' },
            { id: 'b3b', name: 'Plan downgrade issue' },
            { id: 'b3c', name: 'Promo code not applied' },
          ],
        },
      ],
    },
    {
      id: 'product',
      name: 'Product & Delivery',
      items: [
        { id: 'p1', name: 'Defective product', subItems: [] },
        { id: 'p2', name: 'Wrong item sent', subItems: [] },
        {
          id: 'p3', name: 'Delivery problems',
          subItems: [
            { id: 'p3a', name: 'Late delivery' },
            { id: 'p3b', name: 'Damaged packaging' },
            { id: 'p3c', name: 'Item lost in transit' },
          ],
        },
      ],
    },
  ],

  /* ----- AI Filter Tags ----- */
  aiTags: [
    'taking utensils', 'customer anger', 'waiter interaction', 'internal damage concern',
    'damaged packaging', 'shipping impact', 'self retrieval', 'delivery error',
    'misdelivered package', 'damaged shipment', 'leaking bottle', 'inadequate packaging',
    'porch delivery', 'wet cardboard box', 'package left in rain', 'no doorbell ring',
    'failed delivery', 'super bad', 'bad', 'printing industry', 'typesetting',
    'lorem ipsum', 'delivery delay',
  ],

  /* ----- Helper maps ----- */
  statusMap: {
    0: { label: 'New',       cssClass: 'status-new',       icon: '⬜' },
    1: { label: 'Open',      cssClass: 'status-open',      icon: '🟢' },
    2: { label: 'Escalated', cssClass: 'status-escalated', icon: '🟠' },
    3: { label: 'Resolved',  cssClass: 'status-resolved',  icon: '🔵' },
  },

  priorityMap: {
    0: { label: 'Low',      cssClass: 'priority-low' },
    1: { label: 'Medium',   cssClass: 'priority-medium' },
    2: { label: 'High',     cssClass: 'priority-high' },
    3: { label: 'Critical', cssClass: 'priority-critical' },
  },
};
