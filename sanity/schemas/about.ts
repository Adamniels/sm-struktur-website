import { defineField, defineType } from "sanity";

export const aboutSchema = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  icon: () => "✍️",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "The main heading on the About page.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "string",
      description: "A short line below the headline — one sentence.",
    }),

    defineField({
      name: "portrait",
      title: "Portrait Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: "body",
      title: "Story / Bio",
      type: "array",
      description: "The craftsman's background, philosophy, and approach.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
    }),

    defineField({
      name: "workshopImages",
      title: "Workshop / Process Images",
      type: "array",
      description: "Photos of the workshop, tools, or work in progress.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    defineField({
      name: "values",
      title: "Craft Values",
      type: "array",
      description: "Short principles or values — shown as a visual list.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],

  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
