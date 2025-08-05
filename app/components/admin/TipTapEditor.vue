<template>
  <div>
    <!-- modals -->
    <div>
      <!-- Image Modal -->
      <UModal v-model:open="openImageModal" title="Upload Image">
        <template #body>
          <form>
            <UFileUpload
              label="Drop your image here"
              description="SVG, PNG, JPG or GIF (max. 2MB)"
              class="w-96 min-h-40 mx-auto mb-3"
              v-model="imageForm.image"
            />

            <UFormField label="Alt" required>
              <UInput
                variant="soft"
                placeholder="describe your image"
                class="w-full"
                v-model="imageForm.alt"
              />
            </UFormField>

            <div class="flex flex-wrap items-center gap-x-5 mt-3">
              <UCheckbox
                label="Preview Image"
                v-model="imageForm.preview"
                class="flex-grow"
              />

              <UFormField label="Width">
                <UInput
                  variant="soft"
                  v-model="imageForm.width"
                  placeholder="800"
                />
              </UFormField>
              <UFormField label="Height">
                <UInput
                  variant="soft"
                  v-model="imageForm.height"
                  placeholder="auto"
                />
              </UFormField>
            </div>
          </form>
        </template>
        <template #footer>
          <UButton
            @click="uploadImage()"
            color="neutral"
            variant="ghost"
            label="Upload and Add"
            class="btn border-0 rounded-md"
            :loading="isImageUploading"
          />
        </template>
      </UModal>
      <!-- Image Modal -->

      <!-- Link Modal -->
      <UModal v-model:open="openLinkModal" title="Add Link">
        <template #body>
          <form>
            <UFormField label="href" required>
              <UInput
                variant="soft"
                placeholder="https://"
                class="w-full"
                v-model="linkForm.href"
              />
            </UFormField>

            <UFormField label="text" class="my-3">
              <UInput
                variant="soft"
                placeholder="read more"
                class="w-full"
                v-model="linkForm.label"
              />
            </UFormField>

            <UFormField label="rel" required>
              <UInput
                variant="soft"
                placeholder="nofollow norefferer"
                class="w-full"
                v-model="linkForm.rel"
              />
            </UFormField>

            <div class="mt-3">
              <UCheckbox
                label="blank"
                v-model="linkForm.blank"
                size="lg"
                color="success"
              />
            </div>
          </form>
        </template>
        <template #footer>
          <UButton
            @click="setLink()"
            color="neutral"
            variant="ghost"
            label="add link"
            class="btn border-0 rounded-md"
          />
        </template>
      </UModal>
      <!-- Link Modal -->
    </div>
    <!-- xxx modals xxx -->

    <div
      v-if="editor"
      class="editor-toolbar bg-primary p-3 rounded-2xl flex flex-wrap gap-2"
    >
      <u-button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :color="editor.isActive('bold') ? 'secondary' : 'neutral'"
        icon="fa6-solid:bold"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :color="editor.isActive('italic') ? 'secondary' : 'neutral'"
        icon="fa6-solid:italic"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

       <u-button
        @click="editor.commands.unsetColor()"
        :disabled="!editor.can().chain().focus().toggleUnderline().run()"
        :color="editor.isActive('underline') ? 'secondary' : 'neutral'"
        icon="mdi:invert-colors"
        variant="soft"
        size="sm"
        class="cursor-pointer"
        title="reser color"
      />

      <label for="color">
        <u-button
          :color="editor.isActive('underline') ? 'secondary' : 'neutral'"
          icon="mdi:color"
          variant="soft"
          size="sm"
          class="cursor-pointer"
          :style="{
            color: editor.getAttributes('textStyle').color,
          }"
          @click="colorInput?.click()"
        />
        <input
          id="color"
          type="color"
          @input="editor.commands.setColor(($event.target as HTMLInputElement).value)"
          :value="editor.getAttributes('textStyle').color"
          class="hidden"
          ref="colorInput"
        />
      </label>

      <u-button
        @click="editor.chain().focus().toggleUnderline().run()"
        :disabled="!editor.can().chain().focus().toggleUnderline().run()"
        :color="editor.isActive('underline') ? 'secondary' : 'neutral'"
        icon="fa6-solid:underline"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :color="editor.isActive('strike') ? 'secondary' : 'neutral'"
        icon="fa6-solid:strikethrough"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="toggleHtmlView()"
        :color="isHtmlMode ? 'secondary' : 'neutral'"
        icon="mdi:language-html5"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().toggleHighlight().run()"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        icon="fa6-solid:highlighter"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().unsetAllMarks().run()"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="remove all marks"
        icon="fa6-solid:eraser"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <!-- Paragraph / Headings -->
      <u-button
        @click="editor.chain().focus().setParagraph().run()"
        :color="editor.isActive('paragraph') ? 'secondary' : 'neutral'"
        icon="fa6-solid:paragraph"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.commands.setTextAlign('left')"
        :color="
          editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'neutral'
        "
        icon="mdi:format-align-left"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.commands.setTextAlign('center')"
        :color="
          editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'neutral'
        "
        icon="mdi:format-align-center"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.commands.setTextAlign('right')"
        :color="
          editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'neutral'
        "
        icon="mdi:format-align-right"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        v-for="level in 6"
        :key="'h' + level"
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
            .run()
        "
        :color="editor.isActive('heading', { level }) ? 'secondary' : 'neutral'"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      >
        <template #default>
          H<sub>{{ level }}</sub>
        </template>
      </u-button>

      <!-- Lists -->
      <u-button
        @click="editor.chain().focus().toggleBulletList().run()"
        :color="editor.isActive('bulletList') ? 'secondary' : 'neutral'"
        icon="fa6-solid:list-ul"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :color="editor.isActive('orderedList') ? 'secondary' : 'neutral'"
        icon="fa6-solid:list-ol"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <!-- Links -->
      <u-button
        @click="openLinkModal = !openLinkModal"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="Add Link"
        icon="fa6-solid:link"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().unsetLink().run()"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="Remove link"
        :disabled="!editor.isActive('link')"
        icon="fa6-solid:link-slash"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <!-- Block Elements -->
      <u-button
        @click="editor.commands.toggleCodeBlock()"
        :color="editor.isActive('codeBlock') ? 'secondary' : 'neutral'"
        icon="fa6-solid:code"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :color="editor.isActive('blockquote') ? 'secondary' : 'neutral'"
        icon="fa6-solid:quote-right"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().setHorizontalRule().run()"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="Horizontal Line"
        icon="fa6-solid:ruler-horizontal"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().setHardBreak().run()"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="Hard Break"
        icon="fa6-solid:arrow-down"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <!-- Subscript / Superscript -->
      <u-button
        @click="editor.chain().focus().toggleSubscript().run()"
        :color="editor.isActive('subscript') ? 'secondary' : 'neutral'"
        icon="fa6-solid:subscript"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().toggleSuperscript().run()"
        :color="editor.isActive('superscript') ? 'secondary' : 'neutral'"
        icon="fa6-solid:superscript"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <!-- Image -->
      <u-button
        @click="openImageModal = !openImageModal"
        :color="openImageModal ? 'secondary' : 'neutral'"
        icon="fa6-solid:image"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <!-- Table -->
      <u-button
        @click="
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        "
        icon="fa6-solid:table"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="Insert Table"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().deleteTable().run()"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="Remove Table"
        icon="fa6-solid:table-cells-column-lock"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <!-- Undo / Redo -->
      <u-button
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="undo"
        icon="fa6-solid:arrow-rotate-left"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <u-button
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="redo"
        icon="fa6-solid:arrow-rotate-right"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />

      <!-- Extras -->
      <u-button
        icon="fa6-solid:expand"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="fullscreen"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />
      <u-button
        icon="fa6-solid:eye"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="preview"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />
      <u-button
        icon="fa6-solid:floppy-disk"
        :color="editor.isActive('highlight') ? 'secondary' : 'neutral'"
        title="save"
        variant="soft"
        size="sm"
        class="cursor-pointer"
      />
    </div>

    <u-textarea
      v-model="htmlCode"
      variant="soft"
      class="w-full"
      :rows="15"
      v-if="isHtmlMode"
    />
    <EditorContent :editor="editor" v-else />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
type Level = 1 | 2 | 3 | 4 | 5 | 6;
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle, Color } from "@tiptap/extension-text-style";

const toast = useToast();
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "setPreviewImage"]);
const isHtmlMode = ref(false);
const htmlCode = ref("");

const openImageModal = ref(false);
const isImageUploading = ref(false);

const colorInput = ref<HTMLInputElement | null>(null)
const openLinkModal = ref(false);

const { form: imageForm, reset: resetImageForm } = useForm({
  width: "",
  height: "",
  image: null,
  alt: null,
  preview: false,
});

const { form: linkForm, reset: resetLinkForm } = useForm({
  href: "",
  label: "",
  rel: "",
  blank: false,
});

async function uploadImage() {
  try {
    isImageUploading.value = true;
    const formData = new FormData();
    for (const [key, value] of Object.entries(imageForm.value)) {
      formData.append(key, value as any);
    }

    const res = await $fetch<{ success: boolean; data: any }>(
      "/api/admin/uploadImage",
      {
        method: "POST",
        body: formData,
        headers: {
          ContentType: "multipart/form-data",
        },
      }
    );

    if (res.success) {
      if (res.data.preview) {
        emit("setPreviewImage", res.data.src);
        delete res.data.preview;
      }
      editor.value
        ?.chain()
        .setImage({
          ...res.data,
        })
        .run();
      resetImageForm();
      return (openImageModal.value = false);
    }
  } catch (error: any) {
    toast.add({
      title: "failed",
      description: error.statusMessage,
      color: "error",
      icon: "fa6-solid:circle-xmark",
    });
  } finally {
    isImageUploading.value = false;
  }
}

async function setLink() {
  if (!linkForm.value.href) {
    return null;
  }

  editor.value?.commands.setLink({
    href: linkForm.value.href,
    rel: linkForm.value.rel,
    class: "cursor-pointer",
    ...(linkForm.value.blank ? { target: "_blank" } : {}),
  });

  resetLinkForm();
  openLinkModal.value = false;
}

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Highlight,
    TextStyle,
    Color,
    Image.configure({
      HTMLAttributes: {
        class:
          "max-w-full h-auto my-4 shadow rounded-xl aspect-[3/2] object-cover object-center mx-auto block",
      },
    }),
    Table,
    TableRow,
    TableCell,
    TableHeader,
    Subscript,
    Superscript,
    TextAlign.configure({
      types: ["heading", "paragraph"],
      defaultAlignment: "justify",
    }),
  ],
  editorProps: {
    attributes: {
      class:
        "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none w-full ring-1 bg-slate-50 ring-primary my-5 p-3 !max-w-[1400px] !w-full min-h-[200px] max-h-[500px] rounded-border bg-primary text-white",
    },
  },

  onUpdate(props) {
    emit("update:modelValue", props.editor.getHTML());
  },
});

function toggleHtmlView() {
  if (isHtmlMode.value) {
    editor.value?.commands.setContent(htmlCode.value);
  } else {
    htmlCode.value = editor.value?.getHTML() as string;
  }
  isHtmlMode.value = !isHtmlMode.value;
}
</script>

<style scoped>
button {
  margin: 3px 5px;
  padding: 2px;
  border-radius: 5px;
  cursor: pointer;
}

button.is-active {
  background-color: dimgrey;
}
</style>
