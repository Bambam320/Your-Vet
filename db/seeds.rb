puts "🌱 Seeding the table with Veterinarians..."

petArray = ["Bird", "Cat", "Dog", "Horse"]

10.times do
  Doctor.create(
    phone_number: Faker::PhoneNumber.phone_number,
    name: "Dr. #{Faker::Name.name_with_middle}",
    address:  "#{Faker::Address.street_address}, #{Faker::Address.city}, #{Faker::Address.state_abbr} #{Faker::Address.zip}",
    degree: "Doctorate of Veterinary Medecine from #{Faker::University.name}",
    logo: Faker::Company.logo,
    specialty: petArray[rand(1..4)]
  )
end

puts "🌸 Veterinarians have been sewn, seeding Pets... 🌱"

20.times do
  type = petArray[rand(1..4)]
  num = Faker::Number.between
  case type
  when "Cat" 
    fakeAnimal = Faker::Creature::Cat
  when "Dog"
    fakeAnimal = Faker::Creature::Dog
  when "Bird"
    fakeAnimal = Faker::Creature::Bird
  when "Horse"
    fakeAnimal = Faker::Creature::Horse
  end
  Animal.create(
    name: "#{type == "Bird" ? fakeAnimal.common_name : fakeAnimal.name}",
    type: "#{petArray[rand(1..4)]}",
    sex: Faker::Creature::Dog.gender,
    breed: type == "Bird" ? fakeAnimal.common_name : fakeAnimal.breed,
    color: type == "Bird" ? fakeAnimal.color : Faker::Color.color_name,
    age: type == "Bird" ? num(from: 1, to: 15) : type == "Horse" ? num(from: 1, to: 30) : num(from: 1, to: 20),
    existing_conditions: "#{Faker::Lorem.sentence(word_count: 3)}, #{Faker::Lorem.sentence(word_count: 3)}",
    notes: Faker::Lorem.paragraph,
    disposition: Faker::Creature::Bird.emotional_adjective
  )
end

puts "🌸 Pets have been sewn, seeding Appointments... 🌱"

30.times do
  Appointment.create(
    date: Faker::Date.in_date_period(year: 2022, month: 12),
    doctor_id: rand[1..10],
    animal_id: rand[1..20],
    concern: Faker::Lorem.sentence(word_count: 10),
    diagnosis: Faker::Lorem.sentence(word_count: 5),
    prognosis: Faker::Lorem.sentence(word_count: 20)
  )
end

puts "✅ Done seeding!"