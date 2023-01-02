puts "✅ Previously seeded!"

# puts "🌱 Seeding the table with Veterinarians..."

# # sets pet array for use in creating a random animal
# petArray = ["Bird", "Cat", "Dog", "Horse"]

# # a doctor will be created and associated with a user, the id will increment from 1 to 10 and each password is "gg"
# 10.times do |n|
#   university = Faker::University.name
#   salt = BCrypt::Engine::generate_salt
#   passwordDigest = BCrypt::Engine::hash_secret("gg", salt)
#   doctor = Doctor.create(
#     phone_number: Faker::PhoneNumber.phone_number,
#     name: "Dr. #{Faker::Name.name_with_middle}",
#     address:  "#{Faker::Address.street_address}, #{Faker::Address.city}, #{Faker::Address.state_abbr} #{Faker::Address.zip}",
#     degree: "Doctorate of Veterinary Medecine from #{university}",
#     logo: Faker::Company.logo,
#     specialty: petArray[rand(0..3)],
#     university: university,
#   )
#   user = doctor.create_user!(
#     username: n + 1,
#     password_digest: passwordDigest,
#     role: 'doc',
#   )
# end

# puts "🌸 Veterinarians have been sewn, seeding Pets... 🌱"

# #a fake animal will be created and assigned to a user and ids will increment from 11 to 30, passwords are also "gg"
# 20.times do |n|
#   type = petArray[rand(0..3)]
#   salt = BCrypt::Engine::generate_salt
#   passwordDigest = BCrypt::Engine::hash_secret("gg", salt)
#   case type
#   when "Cat" 
#     fakeAnimalName = Faker::Creature::Cat.name
#     fakeAnimalBreed = Faker::Creature::Cat.breed
#     fakeAnimalAge = Faker::Number.between(from: 1, to: 20)
#     fakeAnimalColor = Faker::Color.color_name
#   when "Dog"
#     fakeAnimalName = Faker::Creature::Dog.name
#     fakeAnimalBreed = Faker::Creature::Dog.breed
#     fakeAnimalAge = Faker::Number.between(from: 1, to: 20)
#     fakeAnimalColor = Faker::Color.color_name
#   when "Bird"
#     fakeAnimalName = Faker::Creature::Cat.name
#     fakeAnimalBreed = Faker::Creature::Bird.common_name
#     fakeAnimalAge = Faker::Number.between(from: 1, to: 100)
#     fakeAnimalColor = Faker::Creature::Bird.color
#   when "Horse"
#     fakeAnimalName = Faker::Creature::Horse.name
#     fakeAnimalBreed = Faker::Creature::Horse.breed
#     fakeAnimalAge = Faker::Number.between(from: 1, to: 30)
#     fakeAnimalColor = Faker::Color.color_name
#   end
#   animal = Animal.create(
#     name: fakeAnimalName,
#     sex: Faker::Creature::Dog.gender,
#     breed: fakeAnimalBreed,
#     color: fakeAnimalColor,
#     existing_conditions: "#{Faker::Lorem.sentence(word_count: 3)}, #{Faker::Lorem.sentence(word_count: 3)}",
#     notes: Faker::Lorem.paragraph,
#     age: fakeAnimalAge,
#     disposition: Faker::Creature::Bird.emotional_adjective,
#     classification: type,
#   )
#   user = animal.create_user!(
#     username: n + 11,
#     password_digest: passwordDigest,
#     role: 'pet',
#   )
# end

# puts "🌸 Pets have been sewn, seeding Appointments... 🌱"

# # one hundred appointments will be made and each doctor will have 20 appointments
# (1..10).each do |i|
#   10.times do
#     create_a_new_appointment = Appointment.create!(
#       doctor_id: i,
#       animal_id: Random.rand(1..20),
#       location: Doctor.find(i).address,
#       time: Faker::Time.backward(days: 14, format: :short),
#       concern: "#{Faker::Lorem.sentence(word_count: 10)}",
#       diagnosis: "#{Faker::Lorem.sentence(word_count: 5)}",
#       prognosis: "#{Faker::Lorem.sentence(word_count: 20)}"
#     )
#     create_a_new_appointment
#   rescue ActiveRecord::RecordNotUnique => e
#     create_a_new_appointment
#   end
# end

# puts "✅ Done seeding!"