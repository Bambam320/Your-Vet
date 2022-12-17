puts "🌱 Seeding the table with Veterinarians..."

petArray = ["Bird", "Cat", "Dog", "Horse"]

10.times do |n|
  university = Faker::University.name
  salt = BCrypt::Engine::generate_salt
  passwordDigest = BCrypt::Engine::hash_secret("gg", salt)
  doctor = Doctor.create(
    phone_number: Faker::PhoneNumber.phone_number,
    name: "Dr. #{Faker::Name.name_with_middle}",
    address:  "#{Faker::Address.street_address}, #{Faker::Address.city}, #{Faker::Address.state_abbr} #{Faker::Address.zip}",
    degree: "Doctorate of Veterinary Medecine from #{university}",
    logo: Faker::Company.logo,
    specialty: petArray[rand(0..3)],
    university: university,
  )
  user = doctor.create_user!(
    username: n + 1,
    password_digest: passwordDigest,
    role: 'doc',
  )
end

puts "🌸 Veterinarians have been sewn, seeding Pets... 🌱"

20.times do |n|
  type = petArray[rand(0..3)]
  salt = BCrypt::Engine::generate_salt
  passwordDigest = BCrypt::Engine::hash_secret("gg", salt)
  case type
  when "Cat" 
    fakeAnimalName = Faker::Creature::Cat.name
    fakeAnimalBreed = Faker::Creature::Cat.breed
    fakeAnimalAge = Faker::Number.between(from: 1, to: 20)
    fakeAnimalColor = Faker::Color.color_name
  when "Dog"
    fakeAnimalName = Faker::Creature::Dog.name
    fakeAnimalBreed = Faker::Creature::Dog.breed
    fakeAnimalAge = Faker::Number.between(from: 1, to: 20)
    fakeAnimalColor = Faker::Color.color_name
  when "Bird"
    fakeAnimalName = Faker::Creature::Cat.name
    fakeAnimalBreed = Faker::Creature::Bird.common_name
    fakeAnimalAge = Faker::Number.between(from: 1, to: 100)
    fakeAnimalColor = Faker::Creature::Bird.color
  when "Horse"
    fakeAnimalName = Faker::Creature::Horse.name
    fakeAnimalBreed = Faker::Creature::Horse.breed
    fakeAnimalAge = Faker::Number.between(from: 1, to: 30)
    fakeAnimalColor = Faker::Color.color_name
  end
  animal = Animal.create(
    name: fakeAnimalName,
    sex: Faker::Creature::Dog.gender,
    breed: fakeAnimalBreed,
    color: fakeAnimalColor,
    existing_conditions: "#{Faker::Lorem.sentence(word_count: 3)}, #{Faker::Lorem.sentence(word_count: 3)}",
    notes: Faker::Lorem.paragraph,
    age: fakeAnimalAge,
    disposition: Faker::Creature::Bird.emotional_adjective,
    classification: type,
  )
  user = animal.create_user!(
    username: n + 11,
    password_digest: passwordDigest,
    role: 'pet',
  )
end

puts "🌸 Pets have been sewn, seeding Appointments... 🌱"

(1..10).each do |i|
  3.times do 
    Appointment.create(
      date: "#{Faker::Date.in_date_period(year: 2022, month: 12)}",
      doctor_id: i,
      animal_id: Random.rand(1..20),
      concern: "#{Faker::Lorem.sentence(word_count: 10)}",
      diagnosis: "#{Faker::Lorem.sentence(word_count: 5)}",
      prognosis: "#{Faker::Lorem.sentence(word_count: 20)}"
    )
  end
end

puts "✅ Done seeding!"