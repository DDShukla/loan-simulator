const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");
const fs = require("fs");
const cacheProvider = require("./src/providers/cache-provider");

const port = 9000;

async function startApolloServer(typeDefs, resolvers) {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	await server.start();
	server.applyMiddleware({ app });
	await new Promise(resolve => httpServer.listen({ port: port }, resolve));
	console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`);
}

const typeDefs = gql(fs.readFileSync("./src/Schema.graphql", {encoding: "utf8"}));
const resolvers = require("./src/resolvers");

startApolloServer(typeDefs, resolvers);
cacheProvider.start(function (err) {
	if (err) console.error(err);
});