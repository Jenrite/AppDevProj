import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.author.create({
      data: {
        first_name: "George",
        last_name: "Anderson",
        birth_date: 1932-10-21,
        death_date: null,
      },
    });
    await prisma.genre.create({
        data: {
          genre_name: "Fantasy",
          book_num: "2",
          language: "english",
          fiction: true,
        },
      });
    // await prisma.member.create({
    // data: {
    //     first_name: "Julian",
    //     last_name: "Peterson",
    //     status: valid,
    //     date_join: 2009-4-15, 
    // },
    // });
    // await prisma.library.create({
    //     data: {
    //         address: "645 Pinkle St",
    //         city: "Threed",
    //         post_: 3963,
    // },
    // });

    // await prisma.book.create({
    //     data: {
    //         title: "Tales of bibble",
    //         pub_year: 1952-8-17,
    //         on_hold: false,
    //         city: "Threed",
    //         post_: 3963,
    // },
    // });

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

main();