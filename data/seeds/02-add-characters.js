exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("characters")
    .del()
    .then(async () => {
      const { id } = await knex("users").first();
      const campaigns = await knex("campaigns");
      const locations = await knex("locations");
      const notes = await knex("notes as n").where(
        "n.campaign_id",
        campaigns[0].id
      );
      const data = [
        {
          char_name: "Warion",
          player_name: "Me",
          description: "This is the character I play",
          author_id: id,
          campaign_id: campaigns[0].id,
          location_id: null,
          level: 6,
          class: "Warlock",
          backstory:
            "Parents were killed by bats, so he fights nature dressed as a criminal",
          player_char: 1,
          user_char: 1,
        },
        {
          char_name: "Throden",
          player_name: "Jess",
          description: "The worst lizard person",
          author_id: id,
          campaign_id: campaigns[0].id,
          location_id: null,
          level: 6,
          class: "Druid",
          backstory: "Doesn't understand a thing",
          player_char: 1,
          user_char: 0,
        },
        {
          char_name: "Johniffer",
          player_name: null,
          description: "D'what!?",
          author_id: id,
          campaign_id: campaigns[0].id,
          location_id: locations[0].id,
          level: 1,
          class: null,
          backstory: "Filler text",
          player_char: 0,
          user_char: 0,
        },
        {
          char_name: "Karen",
          player_name: null,
          description: "No manager is safe.",
          author_id: id,
          campaign_id: campaigns[0].id,
          location_id: locations[0].id,
          level: 1,
          class: null,
          backstory: "Filler text",
          player_char: 0,
          user_char: 0,
        },
        {
          char_name: "Fjord",
          player_name: null,
          description: "What is he",
          author_id: id,
          campaign_id: campaigns[0].id,
          location_id: locations[1].id,
          level: 1,
          class: "Paladin",
          backstory: "Filler text",
          player_char: 0,
          user_char: 0,
        },
      ];

      // Inserts seed entries
      await knex("characters").insert(data);
      const characters = await knex("characters");
      function randomIndex(chars) {
        return Math.floor(Math.random() * chars.length);
      }
      const tags = [];
      notes.forEach(async (note) => {
        const charCopy = [...characters];
        const randomInt = Math.floor(Math.random() * 3);
        for (let i = 0; i <= randomInt; i++) {
          const charIndex = randomIndex(charCopy);
          const { id } = charCopy[charIndex];
          tags.push({ note_id: note.id, char_id: id });
          charCopy.splice(charIndex, 1);
        }
      });
      await knex("notes-chars").insert(tags);
    });
};
