

  
  const features = document.querySelectorAll('.icon_wrapper')
  console.log(features)
  
  features.forEach(feature => {
    feature.addEventListener('click', () => {
    let name = document.querySelector('#featureName')
    let desc = document.querySelector('#featureDescription')
    let category = document.querySelector('#featureCategory')
    let icon = document.querySelector('#featureIcon')
    let iconWrapper = document.querySelector('#featureIconWrapper')
    
    if(feature.id === 'target'){
    name.textContent = "Target Members" 
    desc.textContent = "Memb@CRM member profiles allow you to build out a complete picture of your members, including their special interests and dietary preferences."
    category.textContent = "Event Management"
    category.style.backgroundColor = "#f8da6e";
    iconWrapper.style.backgroundColor = "#f8da6e";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d7182748f87748ef6_61cc9c732c76a84d3bd3df8a_schedule_send_black_36dp.svg"
  }

  if(feature.id === 'lead'){
    name.textContent = "Lead Member" 
    desc.textContent = "For each organisation a Lead Member can be assigned. The Lead Member can add other members of their team to Memb@CRM and receive notifications and reports on their organisational activities, such as event attendence."
    category.textContent = "Member Management"
    category.style.backgroundColor = "#8ec1da";
    iconWrapper.style.backgroundColor = "#8ec1da";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5e4902834ed8395e87_61cc94e229c4f90862c53bd5_admin_panel_settings_black_36dp.svg"
  }

  if(feature.id === 'dash'){
    name.textContent = "Member Dashboard" 
    desc.textContent = "The dashboard brings everything into clear focus for all members and admins. The main dashboard view combines news, discussions and events."
    category.textContent = "Member Management"
    category.style.backgroundColor = "#8ec1da";
    iconWrapper.style.backgroundColor = "#8ec1da";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d31aa6e18e8b48ecc_61cc8a1a9df547f318675f8e_dashboard_black_36dp.svg"
  }

  if(feature.id === 'google'){
    name.textContent = "Google Analytics" 
    desc.textContent = "Google Analytics is the de-facto tool for monitoring activity on your website. We provide the option for you to add your Google Tag to your Memb@CRM instance to help you track member engagement."
    category.textContent = "Marketing"
    category.style.backgroundColor = "#e48daf";
    iconWrapper.style.backgroundColor = "#e48daf";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/61cc6af0f698c8e6dc31d345_googleanalytics.svg"
  }

  if(feature.id === 'pref'){
    name.textContent = "Member Preferences" 
    desc.textContent = "Tag members with dietary preferences and assign them to Smart Groups"
    category.textContent = "Member Management"
    category.style.backgroundColor = "#8ec1da";
    iconWrapper.style.backgroundColor = "#8ec1da";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5e718274322b748f04_61cc933a51a3f8ab1fa0fd23_settings_accessibility_black_36dp.svg"
  }

  if(feature.id === 'push'){
    name.textContent = "Push Notifications" 
    desc.textContent = "Built-in notifications keep you and your members informed of marketing activity."
    category.textContent = "Marketing"
    category.style.backgroundColor = "#e48daf";
    iconWrapper.style.backgroundColor = "#e48daf";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d26bff83de6bc12bf_61cc6e4ed957db01227c66c5_notifications_black_36dp.svg"
  }

  if(feature.id === 'surveys'){
    name.textContent = "Member Surveys" 
    desc.textContent = "Our easy to use survey tool allows you to quickly create and publish a members' survey and view the results in your reports dashboard."
    category.textContent = "Member Management"
    category.style.backgroundColor = "#8ec1da";
    iconWrapper.style.backgroundColor = "#8ec1da";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d0273fc3a693a0a64_61cc6e20f08b9faacc17cceb_sentiment_satisfied_black_36dp.svg"
  }

  if(feature.id === 'cpd'){
    name.textContent = "CPD Points" 
    desc.textContent = "Events can be given CPD points for attendance. The CPD total for events attended can then be shown in a member's profile."
    category.textContent = "Event Management"
    category.style.backgroundColor = "#f8da6e";
    iconWrapper.style.backgroundColor = "#f8da6e";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d9bdab12d056ca37e_61cc9b7bcb6785cc23da6ea7_emoji_events_black_36dp.svg"
  }

  if(feature.id === 'zoom'){
    name.textContent = "Zoom or Teams" 
    desc.textContent = "Events that are online can have an event invitation web address added."
    category.textContent = "Event Management"
    category.style.backgroundColor = "#f8da6e";
    iconWrapper.style.backgroundColor = "#f8da6e";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d8b483e045c9886a2_61cc9acd70316962b082fc57_play_circle_filled_black_36dp.svg"
  }

  if(feature.id === 'reports'){
    name.textContent = "Member Reports" 
    desc.textContent = "In addition to Google Analytics, MyMemb@ has a built-in reports dashboard to give you a dynamic snapshot of membership activity."
    category.textContent = "Member Management"
    category.style.backgroundColor = "#8ec1da";
    iconWrapper.style.backgroundColor = "#8ec1da";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d5de4aac5c0aeab20_61cc6df3a690e1b4819c9579_assignment_black_36dp%2520(1).svg"
  }

  if(feature.id === 'news'){
    name.textContent = "Publishing News" 
    desc.textContent = "Create and publish news articles and blogs that appear on your member's dashboard. Tag news articles to display to members or smart groups or specific organisations"
    category.textContent = "Marketing"
    category.style.backgroundColor = "#e48daf";
    iconWrapper.style.backgroundColor = "#e48daf";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5e588452e43c5dd10f_61cc9751855f668d1d32d9f5_feed_black_36dp.svg"
  }

  if(feature.id === 'mail'){
    name.textContent = "Mailchimp Integration" 
    desc.textContent = "Memb@ CRM integrates with MailChimp, which makes syncing your members with your mailing list a sync."
    category.textContent = "Marketing"
    category.style.backgroundColor = "#e48daf";
    iconWrapper.style.backgroundColor = "#e48daf";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d3484be06f217467d_61cc6b86f08b9f825117b681_mailchimp.svg"
  }

  if(feature.id === 'profiles'){
    name.textContent = "Member Profiles" 
    desc.textContent = "Memb@CRM member profiles allow you to build out a complete picture of your members, including their special interests and dietary preferences."
    category.textContent = "Member Management"
    category.style.backgroundColor = "#8ec1da";
    iconWrapper.style.backgroundColor = "#8ec1da";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d7182748f87748ef6_61cc9c732c76a84d3bd3df8a_schedule_send_black_36dp.svg"
  }

  if(feature.id === 'smart'){
    name.textContent = "Smart Groups" 
    desc.textContent = "MyMemb@CRM gives you the ability to create Smart Groups. These are ways to add members from different organisations into groups that share common interests. Use Smart Groups to send targeted messages."
    category.textContent = "Event Management"
    category.style.backgroundColor = "#8ec1da";
    iconWrapper.style.backgroundColor = "#8ec1da";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5deac0b2400789a3e7_61cc6e8abdaf703060c50a81_person_outline_black_36dp.svg"
  }

  if(feature.id === 'banner'){
    name.textContent = "Promotional Banner" 
    desc.textContent = "Publish an announcement that displays as a highlighted banner at the top of your member's screen. Customise the message for different member types or smart group members."
    category.textContent = "Member Management"
    category.style.backgroundColor = "#e48daf";
    iconWrapper.style.backgroundColor = "#e48daf";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5e95becf08a19544d4_61cc985618890cf3200a75fb_campaign_black_36dp.svg"
  }

  if(feature.id === 'events'){
    name.textContent = "Create Events" 
    desc.textContent = "Create online or in-person events and set a date, time and location. Include a photo, description and send invites to all members or members of a specific organisation or smart group."
    category.textContent = "Event Management"
    category.style.backgroundColor = "#f8da6e";
    iconWrapper.style.backgroundColor = "#f8da6e";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d33f46657991f190d_61cc9a112486cda9fb555303_event_black_36dp.svg"
  }

  if(feature.id === 'notes'){
    name.textContent = "Member Notes" 
    desc.textContent = "Log custom notes against any member record and share these notes across your authorised team members of your organisation."
    category.textContent = "Member Management"
    category.style.backgroundColor = "#8ec1da";
    iconWrapper.style.backgroundColor = "#8ec1da";
    icon.srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/63600f5d183e6044f694dfb2_61cc92ad855f6664a932b412_text_snippet_black_36dp.svg"
  }

})
  })
  
  
  
  
  /* Display the appropriate info about the selected theme in the 'theme tab' */
  
  const theme = document.querySelector('#theme')
  
  theme.addEventListener('change', (e) => {
  let name = document.querySelector('#templateName')
  if(e.path[0].value === 'sanctuary'){
    name.textContent = "Sanctuary"
    document.querySelector('#templateDescription').textContent = "The Sanctuary charity website theme has bold, dominant typography and calls-to-action. A feature-packed bronze level template that can be adapted for your brand and message."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/635fee62cffbccd21a223dfc_6246e3d695ed2b8b6f814a81_charity_template2000x1000.jpg"
    document.querySelector('#templateURL').href = "https://charity-bronze.webflow.io?edit"
  }
  if(e.path[0].value === 'ocean'){
    document.querySelector('#templateName').textContent = "Ocean"
    document.querySelector('#templateDescription').textContent = "This environment focused theme can be customised to match the look and feel of your brand. Add content and images and easily connect it to MembaCRM for complete membership marketing and management."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/635fee619780e4c6423c4163_62a891c9faab6b7ba125272e_Charity---Blue-Seas-Trust---Header.jpg"
    document.querySelector('#templateURL').href = "https://charity-silver.webflow.io?edit"
  }
  if(e.path[0].value === 'wisdom'){
    document.querySelector('#templateName').textContent = "Wisdom"
    document.querySelector('#templateDescription').textContent = "This Wisdom theme is a gold level template that can be customised to match the look and feel of your brand. Add content and images and easily connect it to Memba CRM for complete membership marketing and management."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/635fee619780e4cabe3c4162_62a891e97bd03be7c492ee61_Charity---Older---Header.jpg"
    document.querySelector('#templateURL').href = "https://charity-gold.webflow.io?edit"
  }
  if(e.path[0].value === 'high'){
    document.querySelector('#templateName').textContent = "High rise"
    document.querySelector('#templateDescription').textContent = "This elegant theme is perfect for a trade association or corporate body website. It can be customised to match the look and feel of your brand and you can easily add content and images and connect it to MembaCRM for complete membership marketing and management."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/635fee649453b122cf17e152_6246e4cf9f6a64232f39b157_business2_template2000x1000.jpg"
    document.querySelector('#templateURL').href = "https://trade-association-bronze.webflow.io?edit"
  }
  if(e.path[0].value === 'organic'){
    document.querySelector('#templateName').textContent = "Organic"
    document.querySelector('#templateDescription').textContent = "This theme has been designed with neutral colours and a natural, organic feel. It can be customised to match the look and feel of your brand. Add content and images and easily connect it to MembaCRM for complete membership marketing and management."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/635fee60a7f9d3e9f9d35704_62a790e2e8859c88f9d91882_NFP---homepage-1.jpg"
    document.querySelector('#templateURL').href = "https://trade-association-nfp.webflow.io?edit"
  }
  if(e.path[0].value === 'sophistico'){
    document.querySelector('#templateName').textContent = "Sophistico"
    document.querySelector('#templateDescription').textContent = "This classical theme is rich in animation and visual 'wow'. Once your own message and images are added you can present a confident impression that will help drive recruitment and strengthen your brand. Backed by a powerful CMS and optional integration to our membership portal."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/635fee62a2ae4feb3ce8ff41_62a79102453f14037b12ff09_NFP---homepage-1.jpg"
    document.querySelector('#templateURL').href = "https://heritage-arts-and-crafts-association.webflow.io?edit"
  }
  if(e.path[0].value === 'communique'){
    document.querySelector('#templateName').textContent = "Communique"
    document.querySelector('#templateDescription').textContent = "This Communique theme can be customised to match the look and feel of your brand. Add content and images and easily connect it to MembaCRM for complete membership marketing and management."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/635ffe1de8ccd34959cd1735_6248c3590c16fc38b4c808b5_Homepage%20(header).jpg"
    document.querySelector('#templateURL').href = "https://club-or-society-bronze.webflow.io?edit"
  }
  if(e.path[0].value === 'cardio'){
    document.querySelector('#templateName').textContent = "Cardio"
    document.querySelector('#templateDescription').textContent = "The Cardio health club theme brings a highly custom look and feel to your membership organisation. Easily adapted with your own colours, branding and content. Can be optionally integrated with our membership portal for a complete membership marketing and management solution."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/635fee61a2ae4ff145e8ff3f_62a791730281d33015d8f1dd_Premier-Fitness---home.jpg"
    document.querySelector('#templateURL').href = "https://club-or-society-silver.webflow.io?edit"
  }
  if(e.path[0].value === 'astro'){
    document.querySelector('#templateName').textContent = "Astro"
    document.querySelector('#templateDescription').textContent = "The Astro theme is a sophisticated website design that can be easily adapted with your own colours, branding and content. Can be optionally integrated with our membership portal for a complete membership marketing and management solution."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/635fee61d17a753d259e16d3_62a79228fc0436b7497ab405_The-British-Science-Society---homepage-1.jpg"
    document.querySelector('#templateURL').href = "https://the-british-science-society.webflow.io?edit"
  }
  if(e.path[0].value === 'empower'){
    document.querySelector('#templateName').textContent = "Empower"
    document.querySelector('#templateDescription').textContent = "The Empower theme is a perfect starter-template to get your business idea up and running quickly. Can be optionally integrated with our membership portal solution for complete marketing and member management solution."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/635fee6211929eabf826c802_6246d8c03ba32ce60f491096_business_template-hero2000x1000.jpg"
    document.querySelector('#templateURL').href = "https://business-bronze.webflow.io?edit"
  }
  if(e.path[0].value === 'cultivate'){
    document.querySelector('#templateName').textContent = "Cultivate"
    document.querySelector('#templateDescription').textContent = "The Cultivate theme is backed by a powerful CMS to help you manage events, news, team information and so much more. Combine this with our Memba CRM portal and you have an end to end marketing and member management solution."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/6360000a58845206075cb7f1_organic.png"
    document.querySelector('#templateURL').href = "https://organic-fruit-growers-network.webflow.io?edit"
  }
  if(e.path[0].value === '247'){
    document.querySelector('#templateName').textContent = "24/7"
    document.querySelector('#templateDescription').textContent = "The 24/7 theme delivers around the clock! Working hard for your business you have instant brand impact and a template that is fully loaded with all the features and content capability that you need. Combine this with the optional Memba CRM portal and you have an end to end marketing and member management solution."
     document.querySelector('#templateImage').srcset = "https://uploads-ssl.webflow.com/61a536674b8681e731f458ee/636000a89dec1d223ade819a_uid.png"
    document.querySelector('#templateURL').href = "https://united-in-digital.webflow.io?edit"
  }
  })
  
  
  
  /* Modify the plan name */
  if(document.querySelector('#plan').textContent === "plany"){
   console.log('no Plan')
   document.querySelector('#hasPlan').style.display === "none"
   } else {
   console.log('has Plan')
   document.querySelector('#noPlan').style.display === "none"
  }


