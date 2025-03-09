import FundingCall from '../src/models/FundingCall';

export const seedFundingCalls = async () => {
  try {
    // Check if we already have funding calls
    const count = await FundingCall.countDocuments();
    if (count > 0) {
      console.log('✅ Funding calls already exist, skipping seed');
      return;
    }

    const sampleCalls = [
      {
        title: 'Community Development Grant 2025',
        type: 'grant',
        organization: 'Global Community Foundation',
        description: 'Supporting innovative community development projects that promote sustainable growth and social impact.',
        deadline: new Date('2025-06-30'),
        status: 'open',
        applicationUrl: 'https://example.com/community-grant',
        fundingInfo: {
          amount: '50000',
          currency: 'USD',
          type: 'Fixed Grant',
          duration: '12 months'
        },
        eligibility: {
          criteria: [
            'Registered non-profit organization',
            'Minimum 2 years of operation',
            'Focus on community development'
          ],
          restrictions: [
            'Must be based in eligible countries',
            'Previous grantees must wait one cycle'
          ]
        },
        requirements: [
          'Detailed project proposal',
          'Budget breakdown',
          'Impact assessment plan'
        ],
        tags: ['community', 'development', 'social-impact']
      },
      {
        title: 'STEM Education Scholarship 2025',
        type: 'scholarship',
        organization: 'Tech Future Foundation',
        description: 'Full scholarship for undergraduate students pursuing degrees in Science, Technology, Engineering, or Mathematics.',
        deadline: new Date('2025-04-15'),
        status: 'open',
        applicationUrl: 'https://example.com/stem-scholarship',
        fundingInfo: {
          amount: '25000',
          currency: 'USD',
          type: 'Annual Scholarship',
          duration: 'Up to 4 years'
        },
        eligibility: {
          criteria: [
            'High school senior or current undergraduate',
            'Minimum 3.5 GPA',
            'Pursuing STEM degree'
          ],
          restrictions: [
            'Must maintain minimum GPA',
            'Full-time enrollment required'
          ]
        },
        requirements: [
          'Academic transcripts',
          'Two recommendation letters',
          'Personal statement'
        ],
        tags: ['education', 'stem', 'undergraduate']
      },
      {
        title: 'Digital Skills Training Resource',
        type: 'resource',
        organization: 'Digital Empowerment Network',
        description: 'Comprehensive online training materials and workshops for developing digital skills in emerging technologies.',
        deadline: new Date('2025-12-31'),
        status: 'open',
        applicationUrl: 'https://example.com/digital-skills',
        fundingInfo: {
          type: 'Free Resource',
          duration: 'Self-paced'
        },
        eligibility: {
          criteria: [
            'Open to all',
            'Basic computer literacy'
          ]
        },
        requirements: [
          'Create account',
          'Complete initial assessment'
        ],
        tags: ['digital-skills', 'training', 'technology']
      }
    ];

    await FundingCall.insertMany(sampleCalls);
    console.log('✅ Sample funding calls seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding funding calls:', error);
  }
};
