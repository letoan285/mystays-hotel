interface IcheckInOverview {
    name: string;
    icon: string;
    title: string;
}

interface IhotelImageList {
    value: string;
    image: string;
}

export const hotelImageList: IhotelImageList[] = [
  {
    value: 'property',
    image:
            'https://d2ahiw9kb7is19.cloudfront.net/-/media/0C31BB97CBFD4D8DB567A3AA75807F3A.jpg?d=20191003T083854'
  },
  {
    value: 'property',
    image:
            'https://d2ahiw9kb7is19.cloudfront.net/-/media/0D9052555EA541D2A2AF35D2B79CD495.jpg?d=20191003T083845'
  },
  {
    value: 'bedRoom',
    image:
            'https://cdn0.tripla.ai/assets/chatbot_image/picture/24659/AH_Ishigakijima_Room_Comfort_Twin___4_.jpg'
  },
  {
    value: 'bathRoom',
    image:
            'https://d2ahiw9kb7is19.cloudfront.net/-/media/DE0820EB2FCF4615A72A9ABDB5442C4E.jpg?d=20191003T083901'
  },
  {
    value: 'bathRoom',
    image:
            'https://d2ahiw9kb7is19.cloudfront.net/-/media/F05E769447B0437995564D7FD25F2A55.jpg?d=20191007T004144'
  },
  {
    value: 'facility',
    image:
            'https://d2ahiw9kb7is19.cloudfront.net/-/media/C022FDF05B364A078BE3937765C131F3.jpg?d=20191007T004348'
  },
  {
    value: 'facility',
    image:
            'https://d2ahiw9kb7is19.cloudfront.net/-/media/C022FDF05B364A078BE3937765C131F3.jpg?d=20191007T004348'
  },
  {
    value: 'facility',
    image:
            'https://d2ahiw9kb7is19.cloudfront.net/-/media/C022FDF05B364A078BE3937765C131F3.jpg?d=20191007T004348'
  },
  {
    value: 'facility',
    image:
            'https://d2ahiw9kb7is19.cloudfront.net/-/media/484ECB5B8A8C4BF7815BB75AD4825AA5.jpg?d=20180326T091700'
  },
  {
    value: 'restaurent',
    image:
            'https://d2ahiw9kb7is19.cloudfront.net/-/media/C022FDF05B364A078BE3937765C131F3.jpg?d=20191007T004348'
  },
  {
    value: 'sightSeeing',
    image:
            'https://d2ahiw9kb7is19.cloudfront.net/-/media/D8B6AC4E0B5F4950A58C4776026B2A43.jpg?d=20191003T085708'
  }
]

export const findUsOverview: IcheckInOverview[] = [
  { name: 'Map', icon: 'icon-Icon-Map-Pin', title: 'Tokyo, Narita' },
  { name: '20 Minutes', icon: 'icon-Icon-Amenity-Airport', title: 'Narita Airport' },
  { name: '10 Minius', icon: 'icon-Icon-Amenity-Transit', title: 'from JR/Keisei Narita Station' }
]

export const checkInOverview: IcheckInOverview[] = [
  { name: 'Check In - Out', icon: 'icon-Icon-Time', title: '15:00 - 11:00 ' },
  { name: 'Call to Back', icon: 'icon-Icon-Phone', title: '+1 234-567-8910 ' },
  { name: 'Contact Us', icon: 'icon-Icon-Email', title: 'hsm.akasaka@email.com ' }
]

export const confirmOverview : IcheckInOverview[] = [
  { name: 'Check In - Out', icon: 'icon-Icon-Time', title: '15:00 - 11:00 ' },
  { name: '20 minutes', icon: 'icon-Icon-Amenity-Airport', title: '+1 234-567-8910 ' },
  { name: '10 Minius', icon: 'icon-Icon-Amenity-Transit', title: 'from JR/Keisei Narita Station' },
  { name: 'Contact Us', icon: 'icon-Icon-Email', title: '+1 234-567-8910' }
]
