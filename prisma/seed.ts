import { PrismaClient } from '@prisma/client';

const { ENV } = process.env;
const prisma = new PrismaClient();

const devMigrations = async () => {
    await prisma.todo.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: 'Todo #1',
        },
    });

    await prisma.todo.upsert({
        where: { id: 2 },
        update: {},
        create: {
            title: 'Todo #2',
        },
    });
};

async function main() {
    switch (ENV) {
        case 'development':
            await devMigrations();

            break;
        case 'test':
            /** data for your test environment */
            break;
        case 'production':
            /** data for your production environment */
            break;
        default:
            break;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);

        await prisma.$disconnect();

        process.exit(1);
    });
