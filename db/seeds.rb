p "Planting seeds, starting with users."

genres = ["Fiction", "Non-Fiction", "Action", "Adventure", "Comedy", "Mystery", "Crime", "Fantasy", "Historical", "Horror", "Romance", "Satire", "Sci-fi", "Musical", "Poetry"]
seeded_user_ids = []
story_ids = []
genre_ids = []

4.times do
    seeded_user_ids << User.create(username: Faker::FunnyName.unique.name,
    display_name: Faker::FunnyName.unique.name,
    password: Faker::Internet.password(min_length: 8, max_length: 40, mix_case: true, special_characters: true),
    email: Faker::Internet.unique.email
    ).id
end

p "Now planting the seeds of a good story"

40.times do |i|
    story_ids << Story.create(user_id: seeded_user_ids[rand(0..3)], title: Faker::Lorem.unique.sentence, body: Faker::Lorem.paragraph_by_chars(number: rand(50..800))).id
end

p "Now being emotionally influenced by stories"

4.times do |i|
    40.times do |j|
        story = Story.find(story_ids[j])
        story.emotes.create(user_id: seeded_user_ids[i], happy: Faker::Boolean.boolean,
        sad: Faker::Boolean.boolean,
        mad: Faker::Boolean.boolean,
        heart: Faker::Boolean.boolean)
    end
end

p "Creating Genre Entries"

genres.size.times do |i|
    genre_ids << Genre.create(genre: genres[i]).id
end

p "Categorizing story genres"

40.times do |i|
    story = Story.find(story_ids[i])
    story.tags.create(genre_id: genre_ids[rand(0...genre_ids.size-1)])
    story.tags.create(genre_id: genre_ids[rand(0...genre_ids.size-1)])
end

p "Seeding Complete!"